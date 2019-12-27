
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { SearchComponent } from './components/search/search.component';
import { EditCollaboratorComponent } from './components/edit-collaborator/edit-collaborator.component';
import { GraphicsComponent } from './components/graphics/graphics.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'collaborators', component: CollaboratorsComponent },
  { path: 'collaborator/:id', component: CollaboratorComponent},
  { path: 'search/:input', component: SearchComponent },
  { path: 'edit/:id', component: EditCollaboratorComponent },
  { path: 'graphics/:id', component: GraphicsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, { useHash: true } );
