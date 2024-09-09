import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { WardenLoginComponent } from "./warden/warden-login/warden-login.component";
import { StudentLoginComponent } from "./student/student-login/student-login.component";
import { GuardLoginComponent } from "./guard/guard-login/guard-login.component";
import { SendRequestComponent } from "./student/send-request/send-request.component";
import { UpdateRequestComponent } from "./warden/update-request/update-request.component";
import { authGuard } from "./_guard/auth.guard";
import { CheckRequestStudentComponent } from "./student/check-request-student/check-request-student.component";
import { StudentManuComponent } from "./student/student-manu/student-manu.component";
import { CheckRequestWardenComponent } from "./warden/check-request-warden/check-request-warden.component";
import { AllowedStudentsComponent } from "./guard/allowed-students/allowed-students.component";

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'wardenLogin', component: WardenLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'guardLogin', component: GuardLoginComponent},
  { path: 'send-request', component: SendRequestComponent},
  { path: 'check-request-warden', component: CheckRequestWardenComponent},
  { path: 'check-request-student', component: CheckRequestStudentComponent},
  { path: 'update-request', component: UpdateRequestComponent, canActivate:[authGuard]},
  { path: 'student-manu', component: StudentManuComponent},
  { path: 'allowed-students', component:AllowedStudentsComponent}
];
