import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  frm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
    private paisesServices: PaisesService) { }

  //llenar selector
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[]=[];
  fronteras: PaisSmall[] =[];
  cargando: boolean = false;

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones

    // Cuando Cambia el valor del continente
    this.frm.get('region')?.valueChanges
      .pipe(
        //Esto lanza un efecto secundario al ver que el valor cambio
        tap(()=>{
          this.paises = []
          this.frm.get('pais')?.reset('');
          this.cargando = true
        }),
        switchMap((region) => this.paisesServices.getPaisesPorRegion(region))
      ).subscribe(paises => {
        this.paises = paises
        this.cargando = false
      })
      
      
    //Cuando cambia el valor del Pais
    
    this.frm.get('pais')?.valueChanges.pipe(
         //Esto lanza un efecto secundario al ver que el valor cambio
         tap(()=>{
          this.fronteras = []
          this.frm.get('frontera')?.reset('');
          this.cargando = true
        }),
      switchMap(codigo => this.paisesServices.getPaisPorCodigo(codigo))
    ).subscribe( pais  =>{
     if(pais){
      this.fronteras = pais;
      this.cargando = false
      /* if(pais[0].borders){
        this.fronteras = pais[0].borders;
       
       } */
     }
    })
  }

  guardar() {
    console.log(this.frm.value)
  }


}
