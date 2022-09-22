import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Break } from "../../types/Break";
import { map, Observable, Subscription } from 'rxjs';
import { DataTimeRange, UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class BreaksService {
  private apiUrl = "https://g7pytehcbdhvfnklpwyurrepnm0arste.lambda-url.eu-central-1.on.aws/"

  selectedRange: DataTimeRange;
  dataRangeSubscription: Subscription;

  constructor(private http: HttpClient, private uiService: UiService) {
    this.selectedRange = uiService.getDataTimeRange();
    this.dataRangeSubscription = uiService.onDataTimeRange().subscribe((tr) => {
      this.selectedRange = tr;
      this.getBreakData().subscribe();
    });
  }

  getBreakData(): Observable<Break[]> {
    return this.http.get<Break[]>(this.apiUrl).pipe(map((data) => {
      return data.map(d => ({...d, prompt_datetime: new Date(d.prompt_datetime), click_datetime: new Date(d.click_datetime)}))
    }));
  }
}
