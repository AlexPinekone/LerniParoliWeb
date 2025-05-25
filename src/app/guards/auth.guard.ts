import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      // Si el usuario está loggeado, permite el acceso a la ruta
      return true;
    } else {
      // Si el usuario no está loggeado, redirige a la página de inicio de sesión
      // y opcionalmente puedes pasar la URL a la que intentaba acceder para redirigirlo de vuelta después del login
      console.warn('Acceso denegado: Usuario no autenticado. Redirigiendo a /login');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Niega el acceso a la ruta
    }
  }
}