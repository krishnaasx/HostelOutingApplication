import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-allowed-students',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './allowed-students.component.html',
  styleUrl: './allowed-students.component.css'
})
export class AllowedStudentsComponent {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  Requests: any;

  constructor() {
    this.seeAllowedStudents();
  }

  seeAllowedStudents() {
    this.http.get("https://localhost:5001/api/outingrequest/see-history").subscribe({
      next: (response) => {
        this.Requests = response;
        console.log(this.Requests);
      },
      error: error => this.toastr.error(error.error)
    })
  }

}
