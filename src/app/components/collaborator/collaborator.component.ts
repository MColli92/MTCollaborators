import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorsService } from '../../services/collaborators.service';
import { CollaboratorModel } from 'src/app/models/collaborator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html'
})
export class CollaboratorComponent {

  @Input() dni: string;
  collaborator: CollaboratorModel = new CollaboratorModel();
  Antiguedad: number;
  Edad: number;

  constructor(private activatedRoute: ActivatedRoute,
              private collaboratorsService: CollaboratorsService) {
    Swal.fire({
      title: 'Espere...',
      text: 'Cargando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.collaboratorsService.getCollaborator(id).subscribe( (response: CollaboratorModel) => {
      this.collaborator = response;
      this.collaborator.id = id;
      this.Edad = this.calculateAge(response.FechaNacimiento);
      this.Antiguedad = this.calculateAntiquity(response.FechaIngreso);
      Swal.close();
      });
   }

  calculateAge(dateBorn: string) {
    const date = new Date(dateBorn);
    const timeDiff = new Date().getTime() - date.getTime();
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  calculateAntiquity( dateAdmission: string) {
    const date = new Date(dateAdmission);
    const timeDiff = new Date().getTime() - date.getTime();
    const yearsWorking = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return yearsWorking;
  }
}
