import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IToken } from '../token.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../token.test-samples';

import { RestToken, TokenService } from './token.service';

const requireRestSample: RestToken = {
  ...sampleWithRequiredData,
  expiryDate: sampleWithRequiredData.expiryDate?.format(DATE_FORMAT),
};

describe('Token Service', () => {
  let service: TokenService;
  let httpMock: HttpTestingController;
  let expectedResult: IToken | IToken[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TokenService);
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

    it('should create a Token', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const token = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(token).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Token', () => {
      const token = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(token).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Token', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Token', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Token', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTokenToCollectionIfMissing', () => {
      it('should add a Token to an empty array', () => {
        const token: IToken = sampleWithRequiredData;
        expectedResult = service.addTokenToCollectionIfMissing([], token);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(token);
      });

      it('should not add a Token to an array that contains it', () => {
        const token: IToken = sampleWithRequiredData;
        const tokenCollection: IToken[] = [
          {
            ...token,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTokenToCollectionIfMissing(tokenCollection, token);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Token to an array that doesn't contain it", () => {
        const token: IToken = sampleWithRequiredData;
        const tokenCollection: IToken[] = [sampleWithPartialData];
        expectedResult = service.addTokenToCollectionIfMissing(tokenCollection, token);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(token);
      });

      it('should add only unique Token to an array', () => {
        const tokenArray: IToken[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tokenCollection: IToken[] = [sampleWithRequiredData];
        expectedResult = service.addTokenToCollectionIfMissing(tokenCollection, ...tokenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const token: IToken = sampleWithRequiredData;
        const token2: IToken = sampleWithPartialData;
        expectedResult = service.addTokenToCollectionIfMissing([], token, token2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(token);
        expect(expectedResult).toContain(token2);
      });

      it('should accept null and undefined values', () => {
        const token: IToken = sampleWithRequiredData;
        expectedResult = service.addTokenToCollectionIfMissing([], null, token, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(token);
      });

      it('should return initial array if no Token is added', () => {
        const tokenCollection: IToken[] = [sampleWithRequiredData];
        expectedResult = service.addTokenToCollectionIfMissing(tokenCollection, undefined, null);
        expect(expectedResult).toEqual(tokenCollection);
      });
    });

    describe('compareToken', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareToken(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareToken(entity1, entity2);
        const compareResult2 = service.compareToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareToken(entity1, entity2);
        const compareResult2 = service.compareToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareToken(entity1, entity2);
        const compareResult2 = service.compareToken(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
