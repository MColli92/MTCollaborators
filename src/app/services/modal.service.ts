import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ModalModel } from '../models/modal.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private http: HttpClient ) { }

  updateEvaluation( modalModel: ModalModel ) {

    const modalTemp = {
      ...modalModel
    };

    delete modalTemp.id;

    return this.http.put( `${ environment.url }/PerformanceEvaluation/${ modalModel.id }.json`,  modalTemp);
  }

  createEvaluation( modalModel: ModalModel ) {

    const modalTemp = {
      ...modalModel
    };

    delete modalTemp.id;

    return this.http.post( `${ environment.url }/PerformanceEvaluation.json`,  modalTemp).pipe(
      map( (response: any) => {
        modalModel.id = response.name;
        return modalModel;
      })
    );
  }

  getEvaluations() {
    return this.http.get( `${ environment.url }/PerformanceEvaluation.json`)
      .pipe(
        map( this.createArray )
      );
  }

  private createArray( modalModelsObj: object) {
    const modalModels: ModalModel[] = [];
    if (modalModelsObj === null) { return modalModels; }

    Object.keys( modalModelsObj ).forEach( key => {
      const modalModel: ModalModel = modalModelsObj[key];
      modalModel.id = key;
      modalModels.push( modalModel );
    });
    return modalModels;
   }
}
