import { Component, OnInit } from '@angular/core';
import { CollaboratorsService } from 'src/app/services/collaborators.service';
import { CollaboratorModel } from 'src/app/models/collaborator.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html'
})
export class CollaboratorsComponent implements OnInit {

  collaborators: CollaboratorModel[] = [];

  constructor( private collaboratorService: CollaboratorsService,
               private router: Router ) {
  }

  ngOnInit() {
    Swal.fire({
      title: 'Espere...',
      text: 'Cargando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.collaboratorService.getCollaborators()
      .subscribe( response =>  {
        this.collaborators = response;
        Swal.close();
      });
  }

}
