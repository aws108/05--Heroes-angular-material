import { Component, Input, OnInit } from '@angular/core';
import { IHeroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit{
  
  constructor(private heroesService: HeroesService){}


  @Input() lh!: IHeroe; //Es del tipo la interficie. El ! es un trust in me

  ngOnInit(): void {
    console.log('@Input() lh!', this.lh);
  }
  
}
