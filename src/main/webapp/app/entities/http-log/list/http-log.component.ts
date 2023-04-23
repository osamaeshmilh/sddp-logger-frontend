import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHttpLog } from '../http-log.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DEFAULT_SORT_DATA, DESC, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { EntityArrayResponseType, HttpLogService } from '../service/http-log.service';
import { HttpLogDeleteDialogComponent } from '../delete/http-log-delete-dialog.component';
import { FilterOptions, IFilterOption, IFilterOptions } from 'app/shared/filter/filter.model';
import { HttpMethod } from '../../enumerations/http-method.model';

@Component({
  selector: 'jhi-http-log',
  templateUrl: './http-log.component.html',
})
export class HttpLogComponent implements OnInit {
  httpLogs?: IHttpLog[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  filters: IFilterOptions = new FilterOptions();

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 0;
  currentSearch = '';
  startDate = '';
  endDate = '';
  httpMethod = '';

  httpMethodValues = Object.keys(HttpMethod);

  data: any[] = [
    { id: 1, date: '2022-01-01' },
    { id: 2, date: '2022-01-05' },
    { id: 3, date: '2022-01-10' },
  ];

  filteredData: any[] = [];

  constructor(
    protected httpLogService: HttpLogService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IHttpLog): number => this.httpLogService.getHttpLogIdentifier(item);

  ngOnInit(): void {
    this.load();

    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));
  }

  delete(httpLog: IHttpLog): void {
    const modalRef = this.modalService.open(HttpLogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.httpLog = httpLog;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  search(query: string): void {
    if (query) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.page = 0;
    this.currentSearch = query;
    console.log(this.httpMethod);
    this.navigateToWithComponentValues();
  }

  filterByDateRange() {
    this.filteredData = this.data.filter(item => {
      const date = new Date(item.date);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      return date >= startDate && date <= endDate;
    });
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending, this.filters.filterOptions))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 0);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
    this.filters.initializeFromParams(params);
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.httpLogs = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IHttpLog[] | null): IHttpLog[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(
    page?: number,
    predicate?: string,
    ascending?: boolean,
    filterOptions?: IFilterOption[]
  ): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 0;
    const queryObject: any = {
      page: pageToLoad,
      size: this.itemsPerPage,
      'q[http_method_eq]': this.httpMethod,
      'q[request_timestamp_gteq]': this.startDate,
      'q[request_timestamp_lteq]': this.endDate,
      query: this.currentSearch,
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });
    return this.httpLogService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean, filterOptions?: IFilterOption[]): void {
    const queryParamsObj: any = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryParamsObj[filterOption.nameAsQueryParam()] = filterOption.values;
    });

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
