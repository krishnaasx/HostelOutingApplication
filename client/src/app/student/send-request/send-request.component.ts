import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SendRequestService } from "../../_services/send-request.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgFor } from "@angular/common";
import { Location } from "@angular/common";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-send-request',
  standalone: true,
  imports: [
    FormsModule,
    ToastrModule,
    RouterOutlet,
    NgFor,
    RouterLink
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {

  private sendRequestService = inject(SendRequestService);
  private toastr = inject(ToastrService);
  private location = inject(Location);
  studentId: string | null = null;
  model: any = {};

  constructor() {
    this.studentId = this.getUserIdFromToken();
  }

  getUserIdFromToken(): string | null {

    const token = localStorage.getItem('student'); 
    
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.nameid || null;
    }
    return null;
  }

  sendRequest() {
    if (this.model.id == this.studentId!) { 
      this.sendRequestService.request(this.model).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success("The request has been submitted!!");
        },
        error: (error) => {
          this.toastr.info(error.info);
          console.error(error);
        },
        complete: () => console.log("Request has been completed")
      });
    } else {
      this.toastr.error("I see you :-)"); 
    }
  }

  goback() {
    this.location.back();
  }
}
