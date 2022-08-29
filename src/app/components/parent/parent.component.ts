import { Component, OnInit } from '@angular/core';

import { ComunicationService } from 'src/app/services/comunication.service'; 

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styles: [
    `
    .card_background_blue{
      margin: 10px;
    background-color: lightblue;
    }
    `
  ]
})
export class ParentComponent implements OnInit {

    // type: String => string object. Esto lo hago para que se pueda cambiar el valor del mensaje varias veces, segun las necesidades.
  menssageChild!: String;

  menssageParent!: string 



  constructor(
    public _comunicationServ: ComunicationService,
    
  ) { 
    
  }

  ngOnInit(): void {
    // COMUNICACION P > H : 
    // Llamada al Observable 2, para obtener el servicio
    this._comunicationServ.messagePatern$
    .subscribe(
      (message) => this.menssageParent = message
    )
    
    // COMUNICACION P > H : 
    // llamando al evento que comunica entre servicios de manera pura
    this._comunicationServ.childMessageEvent
    .subscribe(
      (message) => this.menssageParent = message
    )
   
  } 
  
  // COMUNICACION P > H : 
  // llamada al servicio - Observable, para darle el valor al mensaje del padre
  useService(){
    this._comunicationServ.setMessageChild('PARENT USING OBSERVABLES')
  }

  // COMUNICACION P > H : 
  // llamada al servicio (puro), para darle el valor al mensaje del padre
  pureService(){
    
    this._comunicationServ.emiterParent('PARENT USING SERVICE')
  }
  
  
 
  

  // COMUNICACION P > H : 
  // Por un lado, al hacer el click en el boton, realizaremos la funcion y le daremos valor al mensaje que vamos a pasar via INPUT al hijo.
  // Por otro lado, en el <app-child> vamos a introductir el [menssageChild]="menssageChild" para que el input en el componente hijo puedo coger el valor de la variable
  inputChange(){
    this.menssageChild = new String ('PARENT USING INPUT PROPERTY');
  }

  // COMUNICACION H > P
  inputChangeParents(menssage : string ){
    this.menssageParent = menssage;
    
  }

}
