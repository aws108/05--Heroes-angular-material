import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHeroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  endPoint: string = environment.endPoint;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<IHeroe[]> { //2
    return this.http.get<IHeroe[]>(`${this.endPoint}/heroes`); //1
  }

  getHeroePorId(id: string): Observable<IHeroe>{
    return this.http.get<IHeroe>(`${this.endPoint}/heroes/${id}`);
  }

  getSugerencia(termino: string): Observable<IHeroe[]>{ //lista de sugerencias
    return this.http.get<IHeroe[]>(`${this.endPoint}/heroes?q=${termino}&_limit=6`)
  }

  agregarHeroe(heroe: IHeroe): Observable<IHeroe>{
    return this.http.post<IHeroe>(`${this.endPoint}/heroes`, heroe); //3
  }

  actualizarHeroe(heroe: IHeroe): Observable<IHeroe>{
    return this.http.put<IHeroe>(`${this.endPoint}/heroes/${heroe.id}`, heroe); //3
  }


}


//1-> //devuelve un Observable<Object>. Este observable es de tipo IHeroe[] devuelve array heroes
//Hace la petición get a una URL y le devolverá un array
//2-> Indica que es un Observable
//3-> El backend devolverá un Observable con el nuevo héroe. 
// El post va acompañado del tipo porque se lo estás enviando por parámetro de entrada