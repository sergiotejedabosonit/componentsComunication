import { Injectable, EventEmitter } from '@angular/core';
 

import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

    // COMUNICACION CON OBSERVABLES
    // creacion de los Observables - creo una variable privada que contendra el observable, para posteriormente crear otro observable que envuelva todo, de tal manera que no se podran realizar cambios que no esten ya creados. 
    
    // Observable 1
    private _messageChild = new BehaviorSubject<string>('')
    public  messageChild$ = this._messageChild.asObservable()

    // Observable 2
    private _messagePatern = new BehaviorSubject<string>('')
    public  messagePatern$ = this._messagePatern.asObservable()

    // funcion para dar valor al Observable 1 con el metodo next
    setMessageChild( message: string) {
      this._messageChild.next(message)
    }

    // funcion para dar valor al Observable 2 con el metodo next
    setMessageParent( message: string) {
      this._messagePatern.next(message)
    }

  // COMUNICACION CON SERVICIOS
  public parentMessageEvent: EventEmitter<any> = new EventEmitter
  public childMessageEvent: EventEmitter<any> = new EventEmitter

  emiterParent(message: string){
    this.parentMessageEvent.emit(message)
  }

  emiterChild(message: string){
    this.childMessageEvent.emit(message)
    
  }
}
