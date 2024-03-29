import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  httpLogsTotal = 0;
  httpLogsLast24Hours = 0;
  httpLogsLast7Days = 0;
  httpLogsLast30Days = 0;

  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#FF6384', '#36A2EB', '#4bb82c', '#eb7536', '#a92f2f', '#FFCE56'],
    },
  ];

  public httpLogsByMethodLabels: Label[] = [];
  public httpLogsByMethodData: number[] = [];

  public httpLogsByStatusCodeLabels: Label[] = [];
  public httpLogsByStatusCodeData: number[] = [];

  public httpLogsByApplicationLabels: Label[] = [];
  public httpLogsByApplicationData: Array<any> = [];

  public httpLogsByOrganizationLabels: Label[] = [];
  public httpLogsByOrganizationData: Array<any> = [];

  public alertEventsOverTimeLabels: Label[] = [];
  public alertEventsOverTimeData: Array<any> = [];

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
      this.httpLogsByApplicationData = [
        {
          data: Object.values(data),
          label: 'Logs by Application',
        },
      ];
      this.httpLogsByApplicationLabels = Object.keys(data);
    });
  }

  fetchHttpLogsByOrganization(): void {
    this.dashboardService.httpLogsByOrganization().subscribe(data => {
      this.httpLogsByOrganizationData = [
        {
          data: Object.values(data),
          label: 'Logs by Organization',
        },
      ];
      this.httpLogsByOrganizationLabels = Object.keys(data);
    });
  }

  fetchAlertEventsOverTime(): void {
    this.dashboardService.alertEventsOverTime().subscribe(data => {
      this.alertEventsOverTimeData = [
        {
          data: Object.values(data),
          label: 'Events',
        },
      ];
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
