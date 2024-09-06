import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Request } from "../../_models/Requests";
import { catchError, of, scheduled, tap } from "rxjs";


@Component({
  selector: 'app-send-request',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {
  
  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/outingrequest/send-request"
  model: any = {};

  sendRequest() {
    return this.http.post<Request> (this.baseUrl, this.model).pipe(
      tap((response) => {
        console.log('Request sent successfully', response);
      })
    )
  }
}
