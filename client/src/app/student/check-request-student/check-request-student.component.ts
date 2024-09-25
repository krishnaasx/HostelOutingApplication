import { Location, NgFor } from "@angular/common";
import { Component, inject, OnInit } from '@angular/core';
import { GetReqByIdService } from "../../_services/get-req-by-id.service";
import { MatTableModule } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';

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

export class CheckRequestStudentComponent{
  
  private getReqByIdService = inject(GetReqByIdService);
  private location = inject(Location);
  Requests: any[] = [];
  displayedColumns: string[] = ['Student-ID', 'Day', 'Date', 'Destination', 'Out-time', 'In-time']
  studentId: string | null  = null;


  constructor() {
    this.getStudentId();
    this.fetchStudentHistory(); 
  } 

  getUserIdFromToken(): string | null {

    const token = localStorage.getItem('student'); 
    
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.nameid || null;
    }
    return null;
  }
  
  getStudentId() {
    this.studentId = this.getUserIdFromToken();
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
