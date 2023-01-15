import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IHeroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  publisher = [ //1
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: IHeroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: ""
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}
  
  
  ngOnInit(): void {
    this.activatedRoute.params //verificar el id. Si existe el id es que estás creando
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroePorId(id)) //3
      )
      .subscribe(res => this.heroe = res); //4
  }

  crear_actualizar(){
    //console.log(this.heroe); //verás que rellena los campos de la interface IHeroe
    if(this.heroe.superhero.trim().length === 0){ //2
      return;
    }
    if(this.heroe.id){ //Si existe el id
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( res=> console.log("Actualizando...", res));
    }else{
      //Crear nuevo registro
      this.heroesService.agregarHeroe(this.heroe).subscribe(
        res => {
          this.router.navigate(['/heroes/editar',res.id]); //5
        }
      );
    }
  }

}


//1-> Este array de objetos es para el desplegable
//2-> Si no existe super héroe, no hagas nada
//3-> Desestructuras el id, devuelves el nuevo observable para obtener un héroe
//4-> La respuesta es el héroe que corresponde al id devuelto por el switchMap y se le pasa al heroe
// con los campos vacíos. Ese heroe está asociado a los campos a través de ngModel, 
// por lo que se devolverán los valores del héroe en los campos del formulario
// Si en los parámetros de la ruta no encuentra un id, no hará nada
// Cargas la info del héroe en el formulario cuando vas a editar
//5-> Que cuando se inserte, redirija a la página de heroes.id, es decir, al heroe que acabas de crear 