import { Component, OnInit } from '@angular/core';
import { faCoffee, faForward, faMinimize } from '@fortawesome/free-solid-svg-icons';
import { Break } from 'src/types/Break';
import { BreaksService } from "../../services/breaks.service";

type SimpleStats = {
  full: number;
  short: number;
  skipped: number;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  faCoffee = faCoffee;
  faForward = faForward;
  faMinimize = faMinimize;

  breaks: Break[] = [];

  simpleStats: SimpleStats|null = null;

  constructor(private breaksService: BreaksService) {
  }

  ngOnInit(): void {
    this.breaksService.getBreakData().subscribe((breaks) => {
      this.breaks = breaks;
      this.calculateStats();
    });
  }


  calculateStats() {
    if (this.breaks.length === 0) return;


    if (this.simpleStats === null) {
      this.simpleStats = {
        full: 0,
        short: 0,
        skipped: 0,
      };
    }

    for (let b of this.breaks) {
      if (b.action === "break_full") {
        this.simpleStats.full++;
      }
      else if (b.action === "break_short") {
        this.simpleStats.short++;
      }
      else if (b.action === "skip") {
        this.simpleStats.skipped++;
      }
    }

  }

}
