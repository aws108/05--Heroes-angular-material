import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint: string = environment.endPoint
  private username: AuthInterface | undefined;

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('token')){ // 5
      return of(false);
    }

    return this.http.get<AuthInterface>(`${this.endPoint}/usuarios/1`).pipe( //6
      map(auth => {
        this.username = auth;
        return true;
      })
    );
  }

  login(){
    return this.http.get<AuthInterface>(`${this.endPoint}/usuarios/1`) //4
      .pipe(
        tap(res => this.username = res), //1
        tap(res => localStorage.setItem('token', res.id)), //3
      );
  }

  getUsername(): AuthInterface{
    return {...this.username!} //2
  }

  logout(){
    this.username = undefined;
  }

}

// 1-> Tap recibirá la respuesta del backend y obtendrá el username antes que el subscribe
// 2-> Desestructuración y spread de this.username para que nunca se modifique. 
//     Se puede tomar el getter en todos los componentes
// 3-> Guardas en el localStorage el usuario para poder mantener la sesión
// 4-> Esto no es un observable, por lo tanto no se usa el subscribe, porque se supone que no
//     se devolverás cambios. 
// 5-> Si no existe el token en el localStorage, devuelve un false, no puede continuar con la sesión,
// 6-> Si aún existe el usuario, hay que verificarlo. Si existe el usuario es true, se le da acceso
// 'of' transforma un valor en observable. Crea observables