import { Component, inject } from '@angular/core';
import { UpdateRequestService } from "../../_services/update-request.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-update-request',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-request.component.html',
  styleUrl: './update-request.component.css'
})
export class UpdateRequestComponent {
  
  private updateRequestService = inject(UpdateRequestService);
  private router = inject(Router);
  model: any = { id: '', model: false};

  updateRequest() {

    if(this.model.status == true) {
      this.updateRequestService.updateRequest(this.model.id, true).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl("/check-request");
        },
        error: (error) => {
          console.error(error);
        }
      });
    }else{
      this.updateRequestService.updateRequest(this.model.id, false).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl("/check-request");
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    
  }

}
