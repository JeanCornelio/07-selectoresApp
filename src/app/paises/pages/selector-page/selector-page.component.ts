import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { paisSmall } from '../../interfaces/paises.interfaces';
import { PaisesService} from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  
  frm: FormGroup = this.fb.group({
    region:['', Validators.required],
    pais:['',Validators.required]
  })

  constructor(private fb: FormBuilder,
    private paisesServices: PaisesService) { }
    
  //llenar selector
  regiones: string[]=[];
  paises: paisSmall[]=[];

  ngOnInit(): void {
  this.regiones = this.paisesServices.regiones

  // Cuando Cambia el Valor
  this.frm.get('region')?.valueChanges
  .pipe(
    switchMap((region)=> this.paisesServices.getPaisesporRegion(region))
  ).subscribe(resp=>{
    this.paises = resp
    console.log(this.paises)
  })
}

  guardar(){
    console.log(this.frm.value)
  }


}
