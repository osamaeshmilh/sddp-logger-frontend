import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Label } from 'ng2-charts';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  httpLogsTotal = 0;
  httpLogsLast24Hours = 0;
  httpLogsLast7Days = 0;
  httpLogsLast30Days = 0;

  public httpLogsByMethodLabels: Label[] = [];
  public httpLogsByMethodData: number[] = [];

  public httpLogsByStatusCodeLabels: Label[] = [];
  public httpLogsByStatusCodeData: number[] = [];

  public httpLogsByApplicationLabels: Label[] = [];
  public httpLogsByApplicationData: number[] = [];

  public httpLogsByOrganizationLabels: Label[] = [];
  public httpLogsByOrganizationData: number[] = [];

  public alertEventsOverTimeLabels: Label[] = [];
  public alertEventsOverTimeData: number[] = [];

  public alertEventsByApplicationLabels: Label[] = [];
  public alertEventsByApplicationData: number[] = [];

  public topTenSlowestRequests: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchHttpLogsByMethod();
    this.fetchHttpLogsByTimeframe();
    this.fetchHttpLogsByStatusCode();
    this.fetchHttpLogsByApplication();
    this.fetchHttpLogsByOrganization();
    this.fetchAlertEventsOverTime();
    this.fetchAlertEventsByApplication();
    this.fetchTopTenSlowestRequests();
  }

  fetchHttpLogsByMethod(): void {
    this.dashboardService.httpLogsByMethod().subscribe(data => {
      this.httpLogsByMethodData = Object.values(data);
      this.httpLogsByMethodLabels = Object.keys(data);
    });
  }

  fetchHttpLogsByTimeframe(): void {
    this.dashboardService.httpLogsByTimeframe().subscribe(data => {
      this.httpLogsTotal = data.total;
      this.httpLogsLast24Hours = data.last_24_hours;
      this.httpLogsLast7Days = data.last_7_days;
      this.httpLogsLast30Days = data.last_30_days;
    });
  }

  fetchHttpLogsByStatusCode(): void {
    this.dashboardService.httpLogsByStatusCode().subscribe(data => {
      this.httpLogsByStatusCodeData = Object.values(data);
      this.httpLogsByStatusCodeLabels = Object.keys(data);
    });
  }

  fetchHttpLogsByApplication(): void {
    this.dashboardService.httpLogsByApplication().subscribe(data => {
      this.httpLogsByApplicationData = Object.values(data);
      this.httpLogsByApplicationLabels = Object.keys(data);
    });
  }

  fetchHttpLogsByOrganization(): void {
    this.dashboardService.httpLogsByOrganization().subscribe(data => {
      this.httpLogsByOrganizationData = Object.values(data);
      this.httpLogsByOrganizationLabels = Object.keys(data);
    });
  }

  fetchAlertEventsOverTime(): void {
    this.dashboardService.alertEventsOverTime().subscribe(data => {
      this.alertEventsOverTimeData = Object.values(data);
      this.alertEventsOverTimeLabels = Object.keys(data);
    });
  }

  fetchAlertEventsByApplication(): void {
    this.dashboardService.alertEventsByApplication().subscribe(data => {
      this.alertEventsByApplicationData = Object.values(data);
      this.alertEventsByApplicationLabels = Object.keys(data);
    });
  }

  fetchTopTenSlowestRequests(): void {
    this.dashboardService.topTenSlowestRequests().subscribe(data => {
      this.topTenSlowestRequests = data;
    });
  }
}
