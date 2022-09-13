#!/bin/bash

if [[ "$1" == "non-initial" ]]; then
  export $(grep URL .env | xargs)
  # -t (timeout) does not seem to work on cinnamon as expected -- max timeout is 5 secons
  # if -u (urgency) is set above normal, the timeout is ignored completely and notification stays forever
  # notify-send -u critical -i media-playback-pause -a "Breaky" "Take a break" "Take a short break, stretch, relax your eyes by looking into the distance"
  PROMPT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

  # blocking call
  RES=$(notify-send.py -u critical -i media-playback-pause -a "Breaky" "Take a break" "Take a short break, stretch, relax your eyes by looking into the distance" --action break_short:"Short Break" break_full:"Full Break" skip:Skip | head -1)

  CLICK_DATE=$(date "+%Y-%m-%d %H:%M:%S")

  if [[ "$RES" == "closed" ]]; then
    RES="break_full"
  fi

  curl --header "Content-Type: application/json" --request "POST" --data "{\"promptDatetime\":\"$PROMPT_DATE\", \"clickDatetime\":\"$CLICK_DATE\", \"action\":\"$RES\"}" "$LAMBDA_STORE_URL" \
  || notify-send.py "Error" "Some Error occured when storing breaky data to DB"
fi


echo "/home/filip/code/productivity-utils/break-notify/break-notify.sh non-initial" | at "now +20 minute"
