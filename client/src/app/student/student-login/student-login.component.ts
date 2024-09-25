import { Component, inject, output } from '@angular/core';
import { StudentAccountService } from "../../_services/student-account.service";
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {

  private studentAccountService = inject(StudentAccountService);
  private router = inject(Router);
  model: any = {};

  studentLogin() {
    localStorage.removeItem('student');
    this.studentAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/student-menu');
      },
      error: (error) => console.log(error)
    });
  }

  goback() {
    this.router.navigateByUrl("/main-menu");
  }

  logout() {
    localStorage.removeItem('student');
  }
  
}
