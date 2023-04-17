import { ApplicationConfigService } from '../../core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/charts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  httpLogsByTimeframe(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/http_logs_by_timeframe`);
  }

  httpLogsByMethod(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/http_logs_by_method`);
  }

  httpLogsByStatusCode(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/http_logs_by_status_code`);
  }

  httpLogsByApplication(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/http_logs_by_application`);
  }

  httpLogsByOrganization(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/http_logs_by_organization`);
  }

  alertEventsOverTime(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/alert_events_over_time`);
  }

  alertEventsByApplication(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/alert_events_by_application`);
  }

  topTenSlowestRequests(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/top_ten_slowest_requests`);
  }
}
