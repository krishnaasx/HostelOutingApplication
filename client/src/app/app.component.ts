import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Hostel-Outing-Application';
  users: any;
  http = inject(HttpClient);
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get("http://localhost:5000/api/profile/students").subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users)
      },
      error: err => console.log(err),
      complete: () => console.log("request has completed!")
    });
  }
}
