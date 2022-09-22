import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stats-card[statName]',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {
  @Input() statName: string = "";
  @Input() statValue: number|undefined;
  @Input() statIcon: IconProp|null = null;
  @Input() statIconColor: string = "blue";

  statIconColorClassesBlue = "bg-blue-300/50 text-blue-500"
  statIconColorClassesGreen = "bg-green-300/50 text-green-500"
  statIconColorClassesOrange = "bg-orange-300/50 text-orange-500"

  faSpinner = faSpinner;

  constructor() { }

  ngOnInit(): void { }

}
