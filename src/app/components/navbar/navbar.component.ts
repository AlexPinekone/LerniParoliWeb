import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  //isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}
    // Aquí podrías verificar si hay sesión activa con un servicio de autenticación real.
    //const token = localStorage.getItem('auth_token');
    //this.isLoggedIn = !!token;
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}