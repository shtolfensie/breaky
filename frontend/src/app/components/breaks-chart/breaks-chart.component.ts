import { Component, OnInit } from '@angular/core';
import { BreaksService } from 'src/app/services/breaks.service';
import { Break } from 'src/types/Break';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type DateDataMap = {[date: string]: { skipped: number, full: number, short: number}};

@Component({
  selector: 'app-breaks-chart',
  templateUrl: './breaks-chart.component.html',
  styleUrls: ['./breaks-chart.component.css']
})
export class BreaksChartComponent implements OnInit {
  faSpinner = faSpinner;

  breaks: Break[] = [];
  chartData: {name: string, series: {name: string, value: number}[]}[] | null = null;

  constructor(private breaksService: BreaksService) {}

  ngOnInit(): void {
    this.breaksService.onBreakData().subscribe((breaks) => {
      this.breaks = breaks;
      this.formatData();
    });
    this.breaksService.getBreakyData();
  }

  formatData() {
    if (this.breaks.length === 0) return;

    let dateDataMap: DateDataMap = {};

    for (let b of this.breaks) {
      const bDate = b.click_datetime;
      const dateStr = `${bDate.getFullYear()}-${bDate.getMonth()}-${bDate.getDate()}`

      if (dateDataMap[dateStr] === undefined) {
        dateDataMap[dateStr] = {
          full: 0,
          short: 0,
          skipped: 0
        }
      }

      if (b.action === "break_full") {
        dateDataMap[dateStr].full++;
      }
      else if (b.action === "break_short") {
        dateDataMap[dateStr].short++;
      }
      else if (b.action === "skip") {
        dateDataMap[dateStr].skipped++;
      }
    }

    console.log(dateDataMap);


    this.chartData = [];
    for (let dk in dateDataMap) {
      this.chartData.push({
        name: dk,
        series: [
          {
            name: "full break",
            value: dateDataMap[dk].full
          },
          {
            name: "short break",
            value: dateDataMap[dk].short
          },
          {
            name: "skipped break",
            value: dateDataMap[dk].skipped
          },
        ]
      })
    }
    this.chartData.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      else if (a == b) {
        return 0;
      }
      else {
        return 1;
      }
    });
  }

}
