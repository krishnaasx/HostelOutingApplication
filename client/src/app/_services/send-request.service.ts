import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Request } from "../_models/Requests";
import { StudentAccountService } from "./student-account.service";

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {

  private http = inject(HttpClient);
  private studentAccountService = inject(StudentAccountService);
  baseUrl = "https://localhost:5001/api/outingrequest/send-request";

  request(model: any) {
    return this.http.post<Request>(this.baseUrl, model)
  }
}
