import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Breaky';

  faMoon = faMoon;
  faSun = faSun;

  navNotSelectedClasses = "text-slate-500 dark:text-slate-400 bg-slate-400/10 hover:bg-slate-400/20";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

}
