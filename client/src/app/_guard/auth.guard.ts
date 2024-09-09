import { inject } from "@angular/core";
import { CanActivateFn } from '@angular/router';
import { WardenAccountService } from "../_services/warden-account.service";
import { ToastrService } from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  
  const wardenAccountService = inject(WardenAccountService);
  const toastr = inject(ToastrService);

  if(wardenAccountService.currentWarden()) {
    return true;
  }else{
    toastr.error("You shall not pass");
    return false;
  }
  
};
