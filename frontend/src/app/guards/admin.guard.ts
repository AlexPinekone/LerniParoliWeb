import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Primero, verifica si el usuario está loggeado.
    // Aunque el AuthGuard ya lo haría, es una buena práctica incluirlo aquí también
    // para que este guard pueda funcionar de forma independiente si fuera necesario.
    if (!this.authService.isLoggedIn()) {
      console.warn('Acceso denegado: Usuario no autenticado. Redirigiendo a /login');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Luego, verifica si el usuario tiene rol de administrador
    if (this.authService.isAdmin()) {
      console.log('Acceso permitido: Usuario es administrador.');
      return true; // Si es admin, permite el acceso
    } else {
      // Si el usuario está loggeado pero no es admin, redirige a una página de "acceso denegado" o a home.
      console.warn('Acceso denegado: Usuario no tiene rol de administrador. Redirigiendo a /home');
      this.router.navigate(['/home']); // O a una página de 'acceso-denegado'
      return false; // Niega el acceso
    }
  }
}