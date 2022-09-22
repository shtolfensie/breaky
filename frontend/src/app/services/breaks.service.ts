import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Break } from "../../types/Break";
import { map, Observable, Subscription, Subject  } from 'rxjs';
import { DataTimeRange, UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class BreaksService {
  private apiUrl = "https://g7pytehcbdhvfnklpwyurrepnm0arste.lambda-url.eu-central-1.on.aws"

  selectedRange: DataTimeRange;
  dataRangeSubscription: Subscription;

  dataSubject = new Subject<Break[]>();

  constructor(private http: HttpClient, private uiService: UiService) {
    this.selectedRange = uiService.getDataTimeRange();

    this._httpGetRequest().subscribe(d => this.dataSubject.next(d));

    this.dataRangeSubscription = uiService.onDataTimeRange().subscribe((tr) => {
      this.selectedRange = tr;
      this._httpGetRequest().subscribe(d => this.dataSubject.next(d));
    });
  }

  onBreakData(): Observable<Break[]> {
    return this.dataSubject.asObservable();
  }

  getBreakyData(): void {
    this._httpGetRequest().subscribe(d => this.dataSubject.next(d));
  }

  _httpGetRequest(): Observable<Break[]> {
    return this.http.get<Break[]>(this.apiUrl + "?range=" + this.selectedRange).pipe(map((data) => {
      return data.map(d => ({...d, prompt_datetime: new Date(d.prompt_datetime), click_datetime: new Date(d.click_datetime)}))
    }));
  }
}
