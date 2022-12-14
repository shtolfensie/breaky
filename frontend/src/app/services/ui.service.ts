import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type DataTimeRange = "today" | "week" | "last200";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private dataTimeRange: DataTimeRange = "week";
  private dataTimeRangeSubject = new Subject<any>();

  setDataTimeRange(tr: DataTimeRange): void {
    if (tr !== this.dataTimeRange) {
      this.dataTimeRange = tr;
      this.dataTimeRangeSubject.next(this.dataTimeRange);
    }
  }

  getDataTimeRange(): DataTimeRange {
    return this.dataTimeRange;
  }

  onDataTimeRange(): Observable<any> {
    return this.dataTimeRangeSubject.asObservable();
  }

  constructor() { }
}
