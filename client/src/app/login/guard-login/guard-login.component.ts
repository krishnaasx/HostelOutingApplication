import { Component, inject, output } from '@angular/core';
import { GuardAccountService } from "../../_services/guard-account.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-guard-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './guard-login.component.html',
  styleUrl: './guard-login.component.css'
})
export class GuardLoginComponent {

  private guardAccountService = inject(GuardAccountService);
  private router = inject(Router);
  cancelLogin = output<boolean>();
  model: any = {};

  guardLogin() {
    this.guardAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.logout();
        this.router.navigateByUrl('/guard-thing');
      },
      error: (error) => console.log(error)
    });
  }

  logout() {
    this.cancelLogin.emit(false);
  }
}
