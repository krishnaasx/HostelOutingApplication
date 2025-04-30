import { Component, inject, output } from '@angular/core';
import { GuardAccountService } from "../../_services/guard-account.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
    selector: 'app-guard-login',
    imports: [
        FormsModule
    ],
    templateUrl: './guard-login.component.html',
    standalone: true,
    styleUrl: './guard-login.component.css'
})
export class GuardLoginComponent {

  private guardAccountService = inject(GuardAccountService);
  private router = inject(Router);
  private location = inject(Location);
  model: any = {};

  guardLogin() {
    this.guardAccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/allowed-students');
      },
      error: (error) => console.log(error)
    });
  }

  goback(){
    this.location.back();
  }

}
