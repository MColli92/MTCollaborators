import { Injectable } from '@angular/core';
import { CollaboratorModel } from '../models/collaborator.model';
import { ModalModel } from '../models/modal.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  constructor( private http: HttpClient ) { }

  getCollaborators() {
    return this.http.get( `${ environment.url }/collaborators.json`)
      .pipe(
        map( this.createArray )
      );
  }

  private createArray( collaboratorsObj: object) {
    const collaborators: CollaboratorModel[] = [];
    if (collaboratorsObj === null) { return collaborators; }

    Object.keys( collaboratorsObj ).forEach( key => {
      const collaborator: CollaboratorModel = collaboratorsObj[key];
      collaborator.id = key;
      collaborators.push( collaborator );
    });
    return collaborators;
   }

  getCollaborator( id: string ) {
    return this.http.get( `${ environment.url }/collaborators/${ id }.json`);
  }

  searchCollaborators( input: string) {
    return this.http.get( `${ environment.url }/collaborators.json`)
      .pipe(
        map( r => {
          return this.search(input, this.createArray(r));
        } )
      );
  }

  createCollaborator( collaborator: CollaboratorModel ) {
    return this.http.post( `${ environment.url }/collaborators.json`,  collaborator).pipe(
      map( (response: any) => {
        collaborator.id = response.name;
        return collaborator;
      })
    );
  }

  updateCollaborator( collaborator: CollaboratorModel ) {

    const collaboratorTemp = {
      ...collaborator
    };

    delete collaboratorTemp.id;

    return this.http.put( `${ environment.url }/collaborators/${ collaborator.id }.json`,  collaboratorTemp);
  }

  private search(input: string, array: any) {
    const collaboratorsArr: CollaboratorModel[] = [];
    input = input.toLocaleLowerCase();

    for (let i = 0; i < array.length; i++) {
      const collaborator = array[i];
      const name = collaborator.Nombres.toLocaleLowerCase();
      const lastname = collaborator.Apellidos.toLocaleLowerCase();

      if ( name.indexOf( input ) >= 0 || lastname.indexOf( input ) >= 0) {
        collaboratorsArr.push(collaborator);
      }
    }
    return collaboratorsArr;
  }

  // updateEvaluation( modalModel: ModalModel ) {

  //   window['value'];

  //   const collaboratorTemp = {

  //   };

  //   delete modalModel.id;

  //   return this.http.put( `${ environment.url }/collaborators/${ collaborator.id }.json`,  collaboratorTemp);
  // }

  getLaborCharges() {
    return this.http.get( `${ environment.url }/laborCharges.json`);
  }

  getCivilStates() {
    return this.http.get( `${ environment.url }/civilStates.json`);
  }

  getDepartures() {
    return this.http.get( `${ environment.url }/departures.json`);
  }

  getNacionalities() {
    return this.http.get( `${ environment.url }/nacionalities.json`);
  }

  getCities() {
    return this.http.get( `${ environment.url }/cities.json`);
  }

  getStudies() {
    return this.http.get( `${ environment.url }/studies.json`);
  }
}
