import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html'
})
export class CollaboratorCardComponent {

  @Input() collaborator: any = {};
  @Input() id: string;

  constructor( private router: Router ) {
  }

  viewCollaborator() {
     this.router.navigate( ['/collaborator', this.id]);
  }

}
