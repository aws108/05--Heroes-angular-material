import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router){}
  
  
  ngOnInit(): void {

    if(!this.router.url.includes('editar')){// si no está editar en la url, no devuelvas nada
      return;
    }

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
        .subscribe( res=> this.mostrarSnackBar('Registro actualizado')); //7
    }else{
      //Crear nuevo registro
      this.heroesService.crearHeroe(this.heroe).subscribe(res => {
        this.router.navigate(['/heroes/editar',res.id]); //5
        this.mostrarSnackBar('Registro actualizado');
        }
      );
    }
  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px;', data: {...this.heroe} //8
    });

    dialog.afterClosed().subscribe( //9
      (resul) => {
        if (resul){
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe( //6
            resp => {
              this.router.navigate(['/heroes']);
            }
          );
        }
      }
    ) 

    
  }

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, '¡Estupendo!', {
      duration: 2500
    });
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
//6-> Si se ha borrado el héroe, la respuesta a estos cambios es que te lleve a la ruta de heroes
//7-> Llama a actualizarHeroe() y se suscribe a los cambios. Cuando estos se hagan, mostrará un mensaje
//8-> el operador ... (spread) es para que nada modifique las propiedades de this.heroe que es un objeto
//9-> .afterClosed() es un observable. Después de que se cierre, si se ha cerrado, que se borre
// Es como un switchMap esta función
