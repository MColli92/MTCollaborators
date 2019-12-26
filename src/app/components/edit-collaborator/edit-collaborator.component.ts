import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorsService } from '../../services/collaborators.service';
import { CollaboratorModel } from '../../models/collaborator.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ModalModel } from '../../models/modal.model';

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html'
})
export class EditCollaboratorComponent implements OnInit {

  formGroup: FormGroup;
  formModal: FormGroup;
  dataChanged = false;
  idParameter: string;
  showError = false;
  laborCharges: any;
  nacionalities: any;
  departures: any;
  civilStates: any;
  cities: any;
  studies: any;
  evaluations: ModalModel[] = [];
  collaborator: CollaboratorModel = new CollaboratorModel();
  anos: string[] = [];
  modalModel: ModalModel = new ModalModel();

// isOverDropElement = false; /*Para el drop file*/

constructor(private activatedRoute: ActivatedRoute,
            private collaboratorsService: CollaboratorsService,
            private modalService: ModalService,
            private router: Router) {
  Swal.fire({
    title: 'Espere...',
    text: 'Cargando información.',
    icon: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();

  this.formModal = new FormGroup({
  Ano: new FormControl('', [ Validators.required] ),
  Comunicacion: new FormControl('', [ Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
  TrabajoEnEquipo: new FormControl('', [ Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
  Liderazgo: new FormControl('', [ Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
  Autonomia: new FormControl('', [ Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
  idCollaborator: new FormControl(''),
  id: new FormControl()
  });

  this.formGroup = new FormGroup({
    Apellidos: new FormControl('', [ Validators.required, Validators.pattern('^[a-z A-Z]*') ] ),
    Nombres: new FormControl('', [ Validators.required, Validators.pattern('^[a-z A-Z]*') ] ),
    DNI: new FormControl('', [ Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]*')] ),
    CUIL: new FormControl('', [ Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('^[0-9]*')] ),
    FechaNacimiento: new FormControl('', [ Validators.required,
                                            Validators.pattern(/^(((0)[1-9])|((1)[0-2]))(\/)(((0)[1-9])|[1-2][0-9]|(3)[0-1])(\/)\d{4}$/)
                                          ] ),
    Nacionalidad: new FormControl('', [ Validators.required ] ),
    Domicilio: new FormControl('', [ Validators.required ] ),
    Ciudad: new FormControl('', [ Validators.required ] ),
    Departamento: new FormControl('', [ Validators.required ] ),
    Puesto: new FormControl('', [ Validators.required ] ),
    EstadoCivil: new FormControl('', [ Validators.required ] ),
    FechaIngreso: new FormControl('', [ Validators.required,
                                        Validators.pattern(/^(((0)[1-9])|((1)[0-2]))(\/)(((0)[1-9])|[1-2][0-9]|(3)[0-1])(\/)\d{4}$/)
                                      ] ),
    EstudiosSecundarios: new FormControl('', [ Validators.required ] ),
    FechaEgreso: new FormControl(''),
    img: new FormControl(),
    id: new FormControl()
  });

  this.collaboratorsService.getLaborCharges().subscribe( response => {
    this.laborCharges = response;
  });

  this.collaboratorsService.getCivilStates().subscribe( response => {
    this.civilStates = response;
  });

  this.collaboratorsService.getDepartures().subscribe( response => {
    this.departures = response;
  });

  this.collaboratorsService.getNacionalities().subscribe( response => {
    this.nacionalities = response;
  });

  this.collaboratorsService.getCities().subscribe( response => {
    this.cities = response;
  });

  this.collaboratorsService.getStudies().subscribe( response => {
    this.studies = response;
  });

  this.modalService.getEvaluations().subscribe( (response: ModalModel[]) => {
    this.evaluations = response;
  });

  this.valueChanges();

  this.idParameter = this.activatedRoute.snapshot.paramMap.get('id');

  if (this.idParameter !== 'nuevo') {
    this.loadCollaborator(this.idParameter);
  } else {
    this.formGroup.get('FechaEgreso').disable();
    Swal.close();
  }
}

  private loadCollaborator(id: string) {
    this.collaboratorsService.getCollaborator(id).subscribe( (response: CollaboratorModel) => {
      this.collaborator = response;
      this.collaborator.id = id;
      this.formGroup.setValue(this.collaborator);
      this.discard();
      Swal.close();
    });
  }

  ngOnInit() {
    this.dataChanged = false;
    let datehoy = new Date().getFullYear();
    for (let i = 1; i <= 5; i++) {
      this.anos.push(datehoy.toString());
      datehoy--;
    }
  }

  saveChanges( form ) {

    if ( form.invalid ) {
      Swal.fire({
        title: 'Error intentando guardar la información.',
        text: 'Verificar que los datos ingresados sean válidos.',
        icon: 'error',
      }).then( x => {
        this.showError = true;
      });

      return;
    }

    Swal.fire({
      title: 'Espere...',
      text: 'Guardando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.collaborator.Apellidos = this.formGroup.get('Apellidos').value.toString();
    this.collaborator.Nombres = this.formGroup.get('Nombres').value.toString();
    this.collaborator.DNI = this.formGroup.get('DNI').value.toString();
    this.collaborator.CUIL = this.formGroup.get('CUIL').value.toString();
    this.collaborator.FechaNacimiento = this.formGroup.get('FechaNacimiento').value.toString();
    this.collaborator.Nacionalidad = this.formGroup.get('Nacionalidad').value.toString();
    this.collaborator.Domicilio = this.formGroup.get('Domicilio').value.toString();
    this.collaborator.Ciudad = this.formGroup.get('Ciudad').value.toString();
    this.collaborator.Departamento = this.formGroup.get('Departamento').value.toString();
    this.collaborator.Puesto = this.formGroup.get('Puesto').value.toString();
    this.collaborator.EstadoCivil = this.formGroup.get('EstadoCivil').value.toString();
    this.collaborator.FechaIngreso = this.formGroup.get('FechaIngreso').value.toString();
    this.collaborator.FechaEgreso = this.formGroup.get('FechaEgreso').value.toString();
    this.collaborator.EstudiosSecundarios = this.formGroup.get('EstudiosSecundarios').value.toString();
    this.collaborator.img = this.formGroup.get('DNI').value.toString() + '.jpg';

    let petition: Observable<any>;

    if ( this.collaborator.id ) { petition = this.collaboratorsService.updateCollaborator(this.collaborator);
    } else { petition = this.collaboratorsService.createCollaborator(this.collaborator); }

    petition.subscribe( response => {
      Swal.fire({
        title: this.collaborator.Apellidos + ' ' + this.collaborator.Nombres,
        text: 'Se actualizó correctamente.',
        icon: 'success',
      }).then( x => {
        this.router.navigate( ['/collaborators'] );
      });
    });
  }

   discard() {
    if (this.idParameter !== 'nuevo') {
      this.formGroup.setValue(this.collaborator);
    } else {
      this.formGroup.controls['Nombres'].setValue('');
      this.formGroup.controls['Apellidos'].setValue('');
      this.formGroup.controls['DNI'].setValue('');
      this.formGroup.controls['CUIL'].setValue('');
      this.formGroup.controls['FechaNacimiento'].setValue('');
      this.formGroup.controls['Nacionalidad'].setValue('');
      this.formGroup.controls['Domicilio'].setValue('');
      this.formGroup.controls['Ciudad'].setValue('');
      this.formGroup.controls['Departamento'].setValue('');
      this.formGroup.controls['Puesto'].setValue('');
      this.formGroup.controls['EstadoCivil'].setValue('');
      this.formGroup.controls['FechaIngreso'].setValue('');
      this.formGroup.controls['EstudiosSecundarios'].setValue('');
      this.formGroup.controls['FechaEgreso'].setValue('');
    }
    this.dataChanged = false;
    this.showError = false;
  }

  back() {
    if ( this.collaborator.id ) {
      this.router.navigate( ['/collaborator', this.collaborator.id] );
    } else {
        this.router.navigate( ['/collaborators'] );
    }
  }

  private valueChanges() {
    this.formGroup.valueChanges.subscribe(value => {
      this.dataChanged = true;
   });
  }

  SaveEval( form ) {

    if ( form.invalid ) {
      Swal.fire({
        title: 'Error intentando guardar la información.',
        text: 'Verificar que los datos ingresados sean válidos.',
        icon: 'error',
      }).then( x => {
        this.showError = true;
      });

      return;
    }

    Swal.fire({
      title: 'Espere...',
      text: 'Guardando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.modalModel.Ano = this.formModal.get('Ano').value.toString();
    this.modalModel.Autonomia = this.formModal.get('Autonomia').value.toString();
    this.modalModel.Comunicacion = this.formModal.get('Comunicacion').value.toString();
    this.modalModel.Liderazgo = this.formModal.get('Liderazgo').value.toString();
    this.modalModel.TrabajoEnEquipo = this.formModal.get('TrabajoEnEquipo').value.toString();
    this.modalModel.idCollaborator = this.collaborator.id;

    let petition: Observable<any>;

    if ( this.modalModel.id !== '' ) { petition = this.modalService.updateEvaluation(this.modalModel);
    } else { petition = this.modalService.createEvaluation(this.modalModel); }

    petition.subscribe( response => {
      Swal.fire({
        title: this.collaborator.Apellidos + ' ' + this.collaborator.Nombres,
        text: 'Se actualizó correctamente.',
        icon: 'success',
      }).then( x => {
          document.getElementById('closeModal').click();
          this.router.navigate( ['/edit', this.collaborator.id] );
          this.modalService.getEvaluations().subscribe( (r: ModalModel[]) => {
            this.evaluations = r;
          });
      });
    });
  }

  LoadModal( date: string ) {
    if ( date === 'first' ) {
      date = new Date().getFullYear().toString();
    } else {
      date = date.substr(3);
    }

    const evaluation = this.evaluations.find(x => x.Ano === date && x.idCollaborator === this.collaborator.id);

    if (evaluation !== undefined) {
      this.modalModel.Ano = evaluation.Ano;
      this.modalModel.Comunicacion = evaluation.Comunicacion;
      this.modalModel.TrabajoEnEquipo = evaluation.TrabajoEnEquipo;
      this.modalModel.Liderazgo = evaluation.Liderazgo;
      this.modalModel.Autonomia = evaluation.Autonomia;
      this.modalModel.idCollaborator = evaluation.idCollaborator;
      this.modalModel.id = evaluation.id;
      this.formModal.setValue(this.modalModel);
    } else {
      this.modalModel.Ano = date;
      this.modalModel.Comunicacion = '';
      this.modalModel.TrabajoEnEquipo = '';
      this.modalModel.Liderazgo = '';
      this.modalModel.Autonomia = '';
      this.modalModel.idCollaborator = this.collaborator.id;
      this.modalModel.id = '';
      this.formModal.setValue(this.modalModel);
    }
  }

}
