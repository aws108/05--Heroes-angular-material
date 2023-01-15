import { Component, OnInit } from '@angular/core';
import { IHeroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  listaHeroes: IHeroe[] = [];

  constructor(private heroesService: HeroesService){}
  
  
  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( resp => {//subscribes el observable
        this.listaHeroes=resp;
    }); 
  }



}
