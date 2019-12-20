import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private http: HttpClient ) { }

  getPerformanceEvaluationById( id: string ) {
    return this.http.get( `${ environment.url }/PerformanceEvaluation/${ id }.json`);
  }
}
