import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor() {
    // Aquí podrías verificar si hay sesión activa con un servicio de autenticación real.
    //const token = localStorage.getItem('auth_token');
    //this.isLoggedIn = !!token;
  }
}