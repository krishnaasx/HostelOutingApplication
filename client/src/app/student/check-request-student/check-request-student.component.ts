import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-check-request-student',
  standalone: true,
  imports: [NgFor],
  templateUrl: './check-request-student.component.html',
  styleUrl: './check-request-student.component.css'
})
export class CheckRequestStudentComponent {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  Requests: any;

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


}
