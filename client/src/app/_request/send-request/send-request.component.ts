import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SendRequestService } from "../../_services/send-request.service";
import { Router, RouterOutlet } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-send-request',
  standalone: true,
  imports: [
    FormsModule,
    ToastrModule,
    RouterOutlet
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent {

  private sendReqeustService = inject(SendRequestService);
  private router = inject(Router);
  private toastr = inject(ToastrService)
  model: any = {};

  sendRequest() {
    this.sendReqeustService.request(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl("/check-request");
      },
      error: (error) => this.toastr.info(error.info),
      complete: () => console.log("Request has been completed")
    })
  }

}
     