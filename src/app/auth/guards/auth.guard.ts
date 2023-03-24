import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAuntenticado => {
            if(!estaAuntenticado){
              this.router.navigate(['auth/login']); //2
            }
          })
        );
    //   if (this.authService.getUsername().id){
    //     return true;
    //   }
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAuntenticado => {
            if(!estaAuntenticado){
              this.router.navigate(['auth/login']); //2
            }
          })
        );
    //   if (this.authService.getUsername().id){ //1
    //     return true;
    //   }
    // return false;
  }
}

// Lo usaremos para mantener la sesión del usuario activa. 
// Es un servicio para implementar reglas de validación en las rutas
// CanLoad evitará que se cargue el módulo que queramos

// 1-> Si username.id existe, que le deje abrir la página, es decir, si el usuario con el que entras 
// está en la BD, pasa, sino, false. Para entrar te tienes que autenticar
// canActivate sirve para evitar que se active el módulo en el caso de no tener usuario. 
// Evita que, si previamente se había cargado el módulo, cuando salgas de la app, no puedas volver sin loguearte
// 2-> Mira si estás autenticado, si no es así, te envía a la página de login 