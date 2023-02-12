import { Injectable } from '@angular/core';
import { IAbsenceFilterRequest, IAbsenceRequest } from '../interfaces/IAbsence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenseService {

  constructor(
    private httpClient: HttpClient,) { }

    API_SECTION = "absences";

  filter(request:IAbsenceFilterRequest): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.API_URL}/${this.API_SECTION}/`, {
      params: request as any
    });
  }

  attend(request:IAbsenceRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}/${this.API_SECTION}/attending`, request);
  }

  absent(request:IAbsenceRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}/${this.API_SECTION}/absent`, request);
  }
}
