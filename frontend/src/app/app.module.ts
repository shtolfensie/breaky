import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule, Routes } from "@angular/router"

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BreaksTableComponent } from './components/breaks-table/breaks-table.component';
import { DateDifferencePipe } from './pipes/date-difference.pipe';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { DateRangeSelectComponent } from './components/date-range-select/date-range-select.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { BreaksChartComponent } from './components/breaks-chart/breaks-chart.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'chart', component: ChartPageComponent },
  { path: 'about', component: AboutPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreaksTableComponent,
    DateDifferencePipe,
    TablePageComponent,
    DateRangeSelectComponent,
    DashboardPageComponent,
    StatsCardComponent,
    ChartPageComponent,
    BreaksChartComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
