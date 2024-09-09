import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { WardenAccountService } from "../../_services/warden-account.service";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-check-request-warden',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './check-request-warden.component.html',
  styleUrl: './check-request-warden.component.css'
})
export class CheckRequestWardenComponent {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  Requests: any;
  wardenAccountService = inject(WardenAccountService);

  ngOnInit(): void {
    this.checkRequest();
  }

  checkRequest() {
    this.http.get("https://localhost:5001/api/outingrequest/check-request").subscribe({
      next: (response) => {
        this.Requests = response;
        console.log(this.Requests);
      },
      error: error => this.toastr.error(error.error),
      complete: () => console.log("request has been completed!")
    });
  }

  navigateToUpdate(requestId: any) {
      this.router.navigate(['/update-request'], { queryParams: { id: requestId } });
  }
}
