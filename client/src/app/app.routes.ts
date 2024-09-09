import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { WardenLoginComponent } from "./login/warden-login/warden-login.component";
import { StudentLoginComponent } from "./login/student-login/student-login.component";
import { GuardLoginComponent } from "./login/guard-login/guard-login.component";
import { SendRequestComponent } from "./_request/send-request/send-request.component";
import { CheckRequestComponent } from "./_request/check-request/check-request.component";
import { UpdateRequestComponent } from "./_request/update-request/update-request.component";
import { authGuard } from "./_guard/auth.guard";

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'wardenLogin', component: WardenLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'guardLogin', component: GuardLoginComponent},
  { path: 'send-request', component: SendRequestComponent},
  { path: 'check-request', component: CheckRequestComponent},
  { path: 'update-request', component: UpdateRequestComponent, canActivate:[authGuard]}
];
