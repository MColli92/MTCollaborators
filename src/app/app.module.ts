// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { CollaboratorsService } from './services/collaborators.service';
import { ModalService } from './services/modal.service';

// Components
import { AppComponent } from './app.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollaboratorCardComponent } from './components/collaborator-card/collaborator-card.component';
import { EditCollaboratorComponent } from './components/edit-collaborator/edit-collaborator.component';
import { GraphicsComponent } from './components/graphics/graphics.component';

// Pipes
import { AddPercentPipe } from './pipes/addPercent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CollaboratorComponent,
    CollaboratorsComponent,
    SearchComponent,
    HomeComponent,
    NavbarComponent,
    CollaboratorCardComponent,
    EditCollaboratorComponent,
    GraphicsComponent,
    AddPercentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    CollaboratorsService,
    ModalService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
