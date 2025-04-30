import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
    selector: 'app-root',
    imports: [
        RouterOutlet,
        NgFor,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Hostel-Outing-Application';
  users: any;
  http = inject(HttpClient);
  
  ngOnInit(): void {
    
  }

  getUsers() {
    this.http.get("https://localhost:5001/api/profile/students").subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users)
      },
      error: err => console.log(err),
      complete: () => console.log("request has completed!")
    });
  }


  setCurrentUser() {

  }
}
