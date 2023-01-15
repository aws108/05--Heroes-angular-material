import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IHeroe } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{

  heroe!: IHeroe;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router){}

  ngOnInit(): void {
    //let id = this.activatedRoute.snapshot.params['id']; //vers 1
    
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId(id)) //1
    )
      .subscribe( (res)=> this.heroe = res); //2
  }

  volver(){
    this.router.navigate(['heroes/listado']);
  }

}


//1-> recibe lo que el params emite y le pasa al servicio el id que ha recogido de los params de la url
//2-> Subscripción a la respuest del observable: En heroe guardas la respuesta, que es el id del héroe