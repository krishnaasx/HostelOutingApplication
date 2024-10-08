import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-allowed-students',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule
  ],
  templateUrl: './allowed-students.component.html',
  styleUrl: './allowed-students.component.css'
})
export class AllowedStudentsComponent {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private location = inject(Location);
  Requests: any[] = [];
  displayedColumns: string[] = ['Student-ID', 'Day', 'Date', 'Destination', 'Out-time', 'In-time']

  constructor() {
    this.seeAllowedStudents();
  }

  seeAllowedStudents() {
    this.http.get<any>("https://localhost:5001/api/outingrequest/see-history").subscribe({
      next: (response) => {
        this.Requests = response;
        console.log(this.Requests);
      },
      error: error => this.toastr.error(error.error)
    })
  }

  goback() {
    this.location.back();
  }

}
