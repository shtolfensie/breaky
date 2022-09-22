import { Component, OnInit } from '@angular/core';
import { Break } from 'src/types/Break';
import { BreaksService } from "../../services/breaks.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breaks-table',
  templateUrl: './breaks-table.component.html',
  styleUrls: ['./breaks-table.component.css']
})
export class BreaksTableComponent implements OnInit {
  breaks: Break[]|null = null
  spinnerIcon = faSpinner;

  constructor(private breaksService: BreaksService) { }

  ngOnInit(): void {
    this.breaksService.onBreakData().subscribe((breaks) => this.breaks = breaks);
    this.breaksService.getBreakyData();
  }

}
