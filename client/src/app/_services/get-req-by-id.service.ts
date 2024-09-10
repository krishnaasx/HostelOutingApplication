import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetReqByIdService {

  private http = inject(HttpClient);

  baseUrl = "https://localhost:5001/api/outingrequest/see-history/";
  getRequestById(studentId: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}${studentId}`);
  }
  
}
