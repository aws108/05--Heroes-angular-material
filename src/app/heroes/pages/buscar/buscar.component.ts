import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IHeroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino: string = "";
  listaHeroes: IHeroe[] = [];
  heroeElegido: IHeroe | undefined;

  constructor(private heroresService: HeroesService){}

  buscando(){
    this.heroresService.getSugerencia(this.termino.trim()) //petición a Bd para buscar héroes
      .subscribe(res => this.listaHeroes = res); //lista de héroes
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    
    if(event.option.value!=""){
      const heroeSelect: IHeroe = event.option.value; //Valor del héroe seleccionado
      this.termino = heroeSelect.superhero //1

    //Petición http para traer la info del héroe seleccionado
    this.heroresService.getHeroePorId(heroeSelect.id!)
    .subscribe( res => this.heroeElegido = res)
    }else{
      this.heroeElegido = undefined; //2
      return;
    }
  
    
  }

}

//1-> Esto hace que cuando selecciones un super héroe, aparezca el heroe seleccionado en la caja de texto
//2-> evitar cuando selecciones un héroe y luego busques y no encuentres nada, desaparezca la info del héroe anterior
// si no es héroe, es undefined y por lo tanto, no muestra la info