#!/bin/bash

if [[ "$1" == "non-initial" ]]; then
  # -t (timeout) does not seem to work on cinnamon as expected -- max timeout is 5 secons
  # if -u (urgency) is set above normal, the timeout is ignored completely and notification stays forever
  notify-send -u critical -i media-playback-pause -a "Breaky" "Take a break" "Take a short break, stretch, relax your eyes by looking into the distance"
fi


echo "/home/filip/code/productivity-utils/break-notify/break-notify.sh non-initial" | at "now +20 minute"
