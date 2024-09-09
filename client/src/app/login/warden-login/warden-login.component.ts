import { Component, inject, output } from '@angular/core';
import { Router } from "@angular/router";
import { WardenAccountService } from "../../_services/warden-account.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-warden-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './warden-login.component.html',
  styleUrl: './warden-login.component.css'
})
export class WardenLoginComponent {

  private wardenAccountService = inject(WardenAccountService);
  private router = inject(Router);
  cancelLogin = output<boolean>();
  model: any = {};

  wardenLogin() {
    this.wardenAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.logout();
        this.router.navigateByUrl('/check-request');
      },
      error: (error) => console.log(error)
    });
  }

  logout() {
    this.cancelLogin.emit(false);
  }
}
