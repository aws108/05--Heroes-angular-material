import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
              private authService: AuthService){}
  login(){
    this.authService.login().subscribe(res => {
      if(res.id){ //1
        this.router.navigate(['./heroes']);
      }
    })
    // Ir al backend
    // Hay que tener un usuaurio en el back
    // Guardra el usuario en un servicio para tenerlo por toda la aplicación

  }

}


// 1-> La respuesta es el usuario. Si existe en la BD, que te lleve a la app