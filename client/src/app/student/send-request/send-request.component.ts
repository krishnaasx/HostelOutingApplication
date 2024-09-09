import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SendRequestService } from "../../_services/send-request.service";
import { Router, RouterOutlet } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgFor } from "@angular/common";
import { StudentAccountService } from "../../_services/student-account.service";

@Component({
  selector: 'app-send-request',
  standalone: true,
  imports: [
    FormsModule,
    ToastrModule,
    RouterOutlet,
    NgFor
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {

  private sendRequestService = inject(SendRequestService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};
  private studentAccountService = inject(StudentAccountService);

  sendRequest(form: any) {
    if (form.valid) { 
      this.sendRequestService.request(this.model).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl("/check-request-student"); 
          // The component(checkRequest) will show the request for the current student - TODO
        },
        error: (error) => {
          this.toastr.info(error.info);
          console.error(error);
        },
        complete: () => console.log("Request has been completed")
      });
    } else {
      this.toastr.error("Please fill in all required fields."); 
    }
  }

}
