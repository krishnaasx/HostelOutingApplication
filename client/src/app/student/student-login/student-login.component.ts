import { Component, inject, output } from '@angular/core';
import { StudentAccountService } from "../../_services/student-account.service";
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";

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
  private location = inject(Location);
  cancelLogin = output<boolean>();
  model: any = {};

  studentLogin() {
    this.studentAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.logout();
        this.router.navigateByUrl('/student-menu');
      },
      error: (error) => console.log(error)
    });
  }

  goback() {
    this.location.back();
  }

  logout() {
    this.cancelLogin.emit(false);
  }
  
}
