import { Component, inject } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-student-menu',
  standalone: true,
  imports: [],
  templateUrl: './student-menu.component.html',
  styleUrl: './student-menu.component.css'
})
export class StudentMenuComponent {
  
  private location = inject(Location);
  goback() {
    this.location.back();
  }
}
