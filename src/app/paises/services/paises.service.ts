import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';
@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[]=[ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  baseUrl:string = environment.baseUrl

  get regiones () : string[]{
    return [...this._regiones];
  }
  constructor(private http: HttpClient) { }


  getPaisesPorRegion(region:string):Observable<PaisSmall[]>{
    const url:string =`${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<PaisSmall[]>(url)
    
  }
 
  getPaisPorCodigo(codigo:string ):Observable<Pais[]  | null >{
    if(!codigo){
      return of(null)
    }

    const url:string =`${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Pais[]>(url)
  }

   
  getPaisPorCodigoSmall(codigo:string ):Observable<PaisSmall>{
    const url:string =`${this.baseUrl}/alpha/${codigo}?fields=name,cca3`;
    return this.http.get<PaisSmall>(url)
  }

  getPaisesPorCodigos(borders:string[]):Observable<PaisSmall[]>{
    if(!borders){
      return of([]);
    }
    const peticiones: Observable<PaisSmall> []= [];

    borders.forEach(  codigo =>{
      const peticion = this.getPaisPorCodigoSmall( codigo );
      peticiones.push(peticion)
    })

    return combineLatest(peticiones);
  }



}
