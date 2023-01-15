import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(module => module.AuthModule)
    //Cuando entre a auth carga las rutas hijas. Se carga cada vesz que se haga la petición -> Lazy load
    //La función de flecha hace una promesa y cuando se cargue, el then carga el AuthModule
    //Cuando el import se resuelva, entonces carga el AuthModule
  },
  {
    path: 'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(module => module.HeroesModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
    }
]

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes) //rutas principales
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
