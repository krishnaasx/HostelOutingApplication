import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from '@angular/core';
import { Guard } from "../_models/Guards";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GuardAccountService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/account";
  currentUser = signal<Guard | null> (null);

  login(model: any) {
    return this.http.post<Guard>(this.baseUrl + "/guard/login", model).pipe(
      map((guard) => {
        if (guard) {
          localStorage.setItem('guard', JSON.stringify(guard));
          this.currentUser.set(guard);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('guard');
    this.currentUser.set(null);
  }

}
