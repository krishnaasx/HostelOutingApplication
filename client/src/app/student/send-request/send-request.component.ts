import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SendRequestService } from "../../_services/send-request.service";
import { RouterOutlet } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgFor } from "@angular/common";
import { Location } from "@angular/common";

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
  private toastr = inject(ToastrService);
  private location = inject(Location);
  model: any = {};

  sendRequest(form: any) {
    if (form.valid) { 
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
      this.toastr.error("Please fill in all required fields."); 
    }
  }

  goback() {
    this.location.back();
  }
}
