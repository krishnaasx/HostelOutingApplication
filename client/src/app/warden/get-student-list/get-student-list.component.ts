import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
    selector: 'app-get-student-list',
    imports: [
        MatTableModule
    ],
    templateUrl: './get-student-list.component.html',
    styleUrl: './get-student-list.component.css'
})

export class GetStudentListComponent {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private location = inject(Location);
  Students: any [] = []
  displayedColumns: string[] = ['Id', 'Name', 'Hostel', 'Room Number', 'Phone Number', 'Parent Phone Number', 'Address', 'Department And Course']

  constructor() {
    this.getStudent();
  }

  getStudent() {
    this.http.get<any>("https://localhost:5001/api/profile/students").subscribe({
      next: (response) => {
        this.Students = response;
        console.log(this.Students);
      },
      error: error => this.toastr.error(error.error)
    })
  }

  goback() {
    this.location.back();
  }

}
