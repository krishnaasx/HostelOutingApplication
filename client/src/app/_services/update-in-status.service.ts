import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateInStatusService {
  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/outingrequest/update-in-status/";

  updateInStatus(sn: any, inStatus: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}${sn}`, inStatus);
  }
}
