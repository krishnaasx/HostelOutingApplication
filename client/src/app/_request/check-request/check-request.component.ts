import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { WardenAccountService } from "../../_services/warden-account.service";

@Component({
  selector: 'app-check-request',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './check-request.component.html',
  styleUrl: './check-request.component.css'
})

export class CheckRequestComponent implements OnInit{

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  Requests: any;
  private wardenAccountService = inject(WardenAccountService);

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


  navigateToUpdate(requestId: string) {
    if(this.wardenAccountService.currentWarden()) {
      this.router.navigate(['/update-request'], { queryParams: { id: requestId } });
    } 
  }
}


