import { Component, inject, output } from '@angular/core';
import { Router } from "@angular/router";
import { WardenAccountService } from "../../_services/warden-account.service";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";

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
  private location = inject(Location);
  model: any = {};
  wardenLoggedIn = false;

  wardenLogin() {
    this.wardenAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.wardenLoggedIn = true;
        this.router.navigateByUrl('/check-request-warden');
      },
      error: (error) => console.log(error)
    });
  }

  goback() {
    this.location.back();
  }

}
