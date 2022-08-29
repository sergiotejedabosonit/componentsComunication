 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComunicationService } from 'src/app/services/comunication.service';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
    `
 .card_background_green{
 
    background-color: rgb(203, 240, 203);
  }
    `
  ]
})
export class ChildComponent implements OnInit {
  
  // COMUNICACION P > H 
  // En este caso, lo que no estamos trayendo es el valor de la variable del padre, la cual se actualizara
  @Input() menssageChild!: String;

  // COMUNICACION H > P
  // En este caso, creamos un evento para poder enviar via OUTPUT la variable que deseamos pasar al padre
  // Por otro lado, deberemos introducir en el <app-child>  (sendMenssageParent)="inputChangeParents( $event )" esto nos servira para poder enviar el sendMenssageParent, por otro lado, declararemos la funcion inputChangeParents() en el padre para poder darle valor al menssage que mostraremos en el padre.
  @Output() sendMenssageParent: EventEmitter<string> = new EventEmitter

  constructor(
    private _comunicationServ: ComunicationService
  ) { }

  ngOnInit(): void {
    // COMUNICACION H > P
    // Llamada al Observable 1, para obtener el servicio
    this._comunicationServ.messageChild$.subscribe(
      (menssage) => this.menssageChild = menssage
    )

    // COMUNICACION H > P
    // llamando al evento que comunica entre servicios de manera pura
    this._comunicationServ.parentMessageEvent
    .subscribe(  
      (message) => this.menssageChild = message
      )
  }

  

  // COMUNICACION H > P 
  // Para poder hacer efectivo el envio de datos, al darle al boton vamos a cambiar el valor de la variable y enviaremos dicho valor al padre.
  inputChange(){
    this.sendMenssageParent.emit('CHILD USING OUTPUT EVENT')
  }

  // COMUNICACION H > P
  // llamada al servicio - Observable, para darle el valor al mensaje del hijo
  useObservable(){
     this._comunicationServ.setMessageParent('CHILD USING OBSERVABLES')
  }

  // COMUNICACION H > P
  // llamada al servicio (puro), para darle el valor al mensaje del hijo
  pureService(){ 
    this._comunicationServ.emiterChild('CHILD USING SERVICES')
  }

}
