import { Component, OnInit } from '@angular/core';
import { DataTimeRange, UiService } from 'src/app/services/ui.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-date-range-select',
  templateUrl: './date-range-select.component.html',
  styleUrls: ['./date-range-select.component.css']
})
export class DateRangeSelectComponent implements OnInit {

  rangeBtnBaseClasses = "text-slate-500 dark:text-slate-400 bg-slate-400/30 hover:bg-gradient-to-tr hover:from-cyan-400 hover:to-cyan-500 hover:text-white";
  rangeBtnSelClasses = "text-white bg-gradient-to-tr from-orange-400 to-pink-400";


  selectedRange: DataTimeRange;
  dataRangeSubscription: Subscription;

  constructor(private uiService: UiService) {
    this.selectedRange = uiService.getDataTimeRange();
    this.dataRangeSubscription = uiService.onDataTimeRange().subscribe((tr) => this.selectedRange = tr);
  }

  ngOnInit(): void {
  }

  onClick(tr: DataTimeRange) {
    console.log(tr);
    this.uiService.setDataTimeRange(tr);
  }

}
