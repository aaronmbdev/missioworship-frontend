import { Injectable } from '@angular/core';
import { IAbsenceFilterRequest, IAbsenceRequest } from '../interfaces/IAbsence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenseServiceService {

  constructor(
    private httpClient: HttpClient,) { }

    API_SECTION = "absences";

  filter(request:IAbsenceFilterRequest): Observable<Date[]> {
    return this.httpClient.post<Date[]>(`${environment.API_URL}/${this.API_SECTION}/`, request);
  }

  attend(request:IAbsenceRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}/${this.API_SECTION}/attendeing`, request);
  }

  absent(request:IAbsenceRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}/${this.API_SECTION}/absences`, request);
  }
}
