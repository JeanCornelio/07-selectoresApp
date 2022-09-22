import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paisSmall } from '../interfaces/paises.interfaces';

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


  getPaisesporRegion(region:string):Observable<paisSmall[]>{
    const url:string =`${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<paisSmall[]>(url)
    
  }
}
