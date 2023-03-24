import { Pipe, PipeTransform } from '@angular/core';
import { IHeroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false //4
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: IHeroe): string {
    // if(!heroe.id && heroe.alt_img){ //1
    //   return 'assets/no-image.png'
    // }else if(heroe.alt_img){ //2
    //   return heroe.alt_img;
    // }else{
    //   return `assets/heroes/${heroe.id}.jpg`; 
    // }

    //if(heroe.id || (heroe.hasOwnProperty('alt_img') && !heroe.alt_img)){

    if(!heroe.id){ //3
      return `assets/no-image.png`;
    }else{
      return heroe.alt_img ? heroe.alt_img : `assets/heroes/${heroe.id}.jpg`; 
    }
  }

}

//1-> Si no existe el id, le coloca una imagen de los assets, que es la imagen por defecto
//2-> Si existe la imagen, devuelve la imagen
//3-> Si no existe heroe.id, pon esa imagen, en caso contrario -> 
//    existe alt_img? si existe pon alt_img, sino, la imagen del heroe
//4-> Cuando el pipe es puro, significa que el transform() es invocado sólo cuando el input
//    del aregumento cambia. El argumento que tenemos es el objeto heroe y este no cambia.
//    - Para que se dispare el ciclo de detección de angular, hay que ponerlo en false.
//    - Esto es para que cuando incluyas la nueva imagen en el formulario (crear/editar), se actualice
//    el objecto con la imagen al instante.
//    - Se quita porque consume muchos recursos

// El método hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.