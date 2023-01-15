import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// RUTAS HIJAS //

const routes: Routes = [
  {
    path: '',
    children: [ //rutas hijas
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes) //Se cargarán mediante carga perezosa
  ],
  exports: [RouterModule] // Se exporta para que se pueda usar en otros modulos
})
export class AuthRoutingModule { }
