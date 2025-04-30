import { Component, inject } from '@angular/core';
import { Location } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
    selector: 'app-warden-menu',
    imports: [
        RouterLink
    ],
    templateUrl: './warden-menu.component.html',
    styleUrl: './warden-menu.component.css'
})
export class WardenMenuComponent {

  private loc = inject(Location);

  goback() {
    this.loc.back();
  }
}
