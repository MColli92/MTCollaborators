import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  formGroup: FormGroup;

  buscador = {
    texto: '',
  };

  constructor( private router: Router ) {

    this.formGroup = new FormGroup({
     'texto' : new FormControl()
    });

    this.formGroup.setValue( this.buscador );

   }

   ngOnInit() {
    this.formGroup.reset( this.buscador );

   }

  searchCollaborators(input: string) {
    this.router.navigate( ['/search', input] );
  }

  clearSearch() {
    this.formGroup.reset( this.buscador );
  }
}
