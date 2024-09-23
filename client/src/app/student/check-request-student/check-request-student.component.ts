import { Location, NgFor } from "@angular/common";
import { Component, inject } from '@angular/core';
import { GetReqByIdService } from "../../_services/get-req-by-id.service";
import { StudentAccountService } from "../../_services/student-account.service";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-check-request-student',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule
  ],
  templateUrl: './check-request-student.component.html',
  styleUrl: './check-request-student.component.css'
})
export class CheckRequestStudentComponent {
  
  private getReqByIdService = inject(GetReqByIdService);
  private studentAccountService = inject(StudentAccountService);
  private location = inject(Location);
  Requests: any[] = [];
  displayedColumns: string[] = ['Student-ID', 'Day', 'Date', 'Destination', 'Out-time', 'In-time']
  studentId: string | null = null;

  constructor() {
    this.studentId = this.studentAccountService.currentUser()?.id ?? null;
    if (this.studentId) {
      this.fetchStudentHistory();
    } else {
      console.error("No student is logged in.");
    }
  }

  fetchStudentHistory() {
    this.getReqByIdService.getRequestById(this.studentId!).subscribe({
      next: (response) => {
        this.Requests = response;
        console.log(this.Requests);
      },
      error: (error) => console.error(error)
    });
  }

  goback() {
    this.location.back();
  }
  
}
