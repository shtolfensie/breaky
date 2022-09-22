import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {

  formatDurationShort(duration: Duration): string {
    let strParts = [];
    if (duration.hours) {
      strParts.push(duration.hours + " h");
    }
    if (duration.minutes) {
      strParts.push(duration.minutes + " m");
    }
    if (duration.seconds) {
      strParts.push(duration.seconds + " s");
    }

    if (strParts) {
      return strParts.join(" ");
    }
    else {
      return "instant";
    }
  }

  transform(newDate: Date, oldDate: Date): string {
    const duration = intervalToDuration({ start: oldDate, end: newDate })
    const durStr = this.formatDurationShort(duration);
    return durStr;
  }

}
