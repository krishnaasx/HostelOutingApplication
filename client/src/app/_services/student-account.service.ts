import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from '@angular/core';
import { Student } from "../_models/Students";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StudentAccountService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/account";
  currentUser = signal<Student | null> (null);

  login(model: any) {
    return this.http.post<Student>(this.baseUrl + "/student/login", model).pipe(
      map((student) => {
        if (student) {
          localStorage.setItem('student', JSON.stringify(student));
          this.currentUser.set(student);
        }
      })
    )
  }

  studentLogout() {
    localStorage.removeItem('student');
    this.currentUser.set(null);
  }
}
