import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAlertEvent } from '../alert-event.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../alert-event.test-samples';

import { AlertEventService } from './alert-event.service';

const requireRestSample: IAlertEvent = {
  ...sampleWithRequiredData,
};

describe('AlertEvent Service', () => {
  let service: AlertEventService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlertEvent | IAlertEvent[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlertEventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a AlertEvent', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const alertEvent = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(alertEvent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlertEvent', () => {
      const alertEvent = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(alertEvent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AlertEvent', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlertEvent', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AlertEvent', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlertEventToCollectionIfMissing', () => {
      it('should add a AlertEvent to an empty array', () => {
        const alertEvent: IAlertEvent = sampleWithRequiredData;
        expectedResult = service.addAlertEventToCollectionIfMissing([], alertEvent);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alertEvent);
      });

      it('should not add a AlertEvent to an array that contains it', () => {
        const alertEvent: IAlertEvent = sampleWithRequiredData;
        const alertEventCollection: IAlertEvent[] = [
          {
            ...alertEvent,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlertEventToCollectionIfMissing(alertEventCollection, alertEvent);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlertEvent to an array that doesn't contain it", () => {
        const alertEvent: IAlertEvent = sampleWithRequiredData;
        const alertEventCollection: IAlertEvent[] = [sampleWithPartialData];
        expectedResult = service.addAlertEventToCollectionIfMissing(alertEventCollection, alertEvent);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alertEvent);
      });

      it('should add only unique AlertEvent to an array', () => {
        const alertEventArray: IAlertEvent[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const alertEventCollection: IAlertEvent[] = [sampleWithRequiredData];
        expectedResult = service.addAlertEventToCollectionIfMissing(alertEventCollection, ...alertEventArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alertEvent: IAlertEvent = sampleWithRequiredData;
        const alertEvent2: IAlertEvent = sampleWithPartialData;
        expectedResult = service.addAlertEventToCollectionIfMissing([], alertEvent, alertEvent2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alertEvent);
        expect(expectedResult).toContain(alertEvent2);
      });

      it('should accept null and undefined values', () => {
        const alertEvent: IAlertEvent = sampleWithRequiredData;
        expectedResult = service.addAlertEventToCollectionIfMissing([], null, alertEvent, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alertEvent);
      });

      it('should return initial array if no AlertEvent is added', () => {
        const alertEventCollection: IAlertEvent[] = [sampleWithRequiredData];
        expectedResult = service.addAlertEventToCollectionIfMissing(alertEventCollection, undefined, null);
        expect(expectedResult).toEqual(alertEventCollection);
      });
    });

    describe('compareAlertEvent', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlertEvent(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAlertEvent(entity1, entity2);
        const compareResult2 = service.compareAlertEvent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAlertEvent(entity1, entity2);
        const compareResult2 = service.compareAlertEvent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAlertEvent(entity1, entity2);
        const compareResult2 = service.compareAlertEvent(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
