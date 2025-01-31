import { Injectable } from "@angular/core";
import { Api } from "src/app/shared/resources/openmrs";
import { Observable, from, of } from "rxjs";
import { OpenmrsHttpClientService } from "src/app/shared/modules/openmrs-http-client/services/openmrs-http-client.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WorkSeetsService {
  constructor(private httpClient: OpenmrsHttpClientService) {}

  createWorkSheet(data: any): Observable<any> {
    return this.httpClient.post(`lab/worksheets`, data).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }

  getWorkSheets(): Observable<any[]> {
    return this.httpClient.get(`lab/worksheets`).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }

  createWorksheetControls(data: any): Observable<any> {
    return this.httpClient.post(`lab/worksheetcontrols`, data).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }

  getWorksheetControls(): Observable<any[]> {
    return this.httpClient.get(`lab/worksheetcontrols`).pipe(
      map((controlsRespone: any) => {
        return controlsRespone?.map((response) => {
          return {
            ...response,
            testOrder: {
              ...response?.testOrder,
              name:
                response?.testOrder?.display?.indexOf(":") > -1
                  ? response?.testOrder?.display?.split(":")[1]
                  : response?.testOrder?.display,
              display:
                response?.testOrder?.display?.indexOf(":") > -1
                  ? response?.testOrder?.display?.split(":")[1]
                  : response?.testOrder?.display,
            },
          };
        });
      }),
      catchError((error) => of(error))
    );
  }

  createWorksheetDefinitions(data: any): Observable<any[]> {
    return this.httpClient.post(`lab/worksheetdefinitions`, data).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }

  getWorksheetDefinitions(): Observable<any[]> {
    return this.httpClient.get(`lab/worksheetdefinitions`).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }
}
