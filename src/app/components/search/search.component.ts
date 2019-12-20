import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorsService } from '../../services/collaborators.service';
import { CollaboratorModel } from '../../models/collaborator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  collaborators: CollaboratorModel[] = [];
  input: string;

  constructor( private activatedRoute: ActivatedRoute,
               private collaboratorsService: CollaboratorsService) {
  }

  ngOnInit() {
    Swal.fire({
      title: 'Espere...',
      text: 'Cargando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.activatedRoute.params.subscribe( params => {
      this.input = params['input'];
      this.collaboratorsService.searchCollaborators(this.input)
        .subscribe( response => {
          this.collaborators = response;
          Swal.close();
        });
    });
  }

}
