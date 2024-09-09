import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-student-manu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './student-manu.component.html',
  styleUrl: './student-manu.component.css'
})
export class StudentManuComponent {

  private location = inject(Location);
  goback() {
    this.location.back();
  }
}
