import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-main-menu',
    imports: [
        RouterLink
    ],
    templateUrl: './main-menu.component.html',
    standalone: true,
    styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

}
