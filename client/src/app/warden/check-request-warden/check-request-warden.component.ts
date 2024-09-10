import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgFor } from "@angular/common";
import { Location } from "@angular/common";
import { UpdateRequestService } from "../../_services/update-request.service";

@Component({
  selector: 'app-check-request-warden',
  standalone: true,
  imports: [NgFor],
  templateUrl: './check-request-warden.component.html',
  styleUrl: './check-request-warden.component.css',
})
export class CheckRequestWardenComponent {
  
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private location = inject(Location);
  private updateRequestService = inject(UpdateRequestService);
  Requests: any;

  constructor() {
    this.checkRequest();
  }

  checkRequest() {
    this.http
      .get('https://localhost:5001/api/outingrequest/check-request')
      .subscribe({
        next: (response) => {
          this.Requests = response;
          console.log(this.Requests);
        },
        error: (error) => this.toastr.error(error.error),
        complete: () => console.log('request has been completed!'),
      });
  }

  goback() {
    this.location.back();
  }

  update(requestId: any, status: boolean) {
    this.updateRequestService.updateRequest(requestId, !status).subscribe({
      next: (response) => {
        console.log(response);
        this.Requests = this.Requests.map((request: any) => {
          if(request.requestId == requestId) {
            request.status = !status;
          }
          return request;
        });
        this.toastr.success("status updated succesfully");
      },
      error : (error) => this.toastr.error(error.error)
    })
    
  }
}
