import { Pipe, PipeTransform } from '@angular/core';
import { IHeroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: IHeroe): string {
    return `assets/heroes/${value.id}.jpg`;
  }

}