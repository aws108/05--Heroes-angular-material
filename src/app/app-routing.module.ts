import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(module => module.AuthModule)
    //Cuando entre a auth carga las rutas hijas. Se carga cada vez que se haga la petición -> Lazy load
    //La función de flecha hace una promesa y cuando se cargue, el then carga el AuthModule
    //Cuando el import se resuelva, entonces carga el AuthModule
    
  },
  {
    path: 'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(module => module.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
    // canLoad: AuthGuard evitará que se cargue este módulo si no está autenticado.
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
