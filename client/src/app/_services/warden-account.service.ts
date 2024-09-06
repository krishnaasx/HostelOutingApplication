import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from '@angular/core';
import { Warden } from "../_models/Wardens";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WardenAccountService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/account";
  currentUser = signal<Warden | null> (null);

  login(model: any) {
    return this.http.post<Warden>(this.baseUrl + "/warden/login", model).pipe(
      map((warden) => {
        if (warden) {
          localStorage.setItem('warden', JSON.stringify(warden));
          this.currentUser.set(warden);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('warden');
    this.currentUser.set(null);
  }
}
