import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type DataTimeRange = "today" | "week" | "last200";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private dataTimeRange: DataTimeRange = "today";
  private dataTimeRangeSubject = new Subject<any>();

  setDataTimeRange(tr: DataTimeRange): void {
    this.dataTimeRange = tr;
    this.dataTimeRangeSubject.next(this.dataTimeRange);
  }

  getDataTimeRange(): DataTimeRange {
    return this.dataTimeRange;
  }

  onDataTimeRange(): Observable<any> {
    return this.dataTimeRangeSubject.asObservable();
  }

  constructor() { }
}
