import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateRequestService {
  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/outingrequest/update-request/";

  updateRequest(id: string, status: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, status);
  }
}
