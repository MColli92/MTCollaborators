import { Component } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { ModalModel } from '../../models/modal.model';
import { Router } from '@angular/router';
import { CollaboratorsService } from '../../services/collaborators.service';
import { CollaboratorModel } from 'src/app/models/collaborator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html'
})
export class GraphicsComponent {

  idParameter: string;
  evaluations: ModalModel[] = [];
  collaborator: string;
  competition = '';

  // Radar
  public radarChartData: ChartDataSets[] = [ ];
  public radarChartType: ChartType = 'radar';
  public radarChartLabels: Label[] = ['Autonomia', 'Comunicacion', 'Liderazgo', 'TrabajoEnEquipo'];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
          beginAtZero: true,
          max: 100,
          min: 0,
          stepSize: 10
      }
    }
  };
  // Radar End

  // Line
  public lineChartData: ChartDataSets[] = [ ];
  public lineChartType = 'line';
  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          position: 'left',
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
            stepSize: 10
          },
        }
      ]
    },
    annotation: {
      annotations: [ { }, ],
    },
  };
  // Line End

  constructor(private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private router: Router,
              private collaboratorsService: CollaboratorsService) {

    Swal.fire({
      title: 'Espere...',
      text: 'Cargando información.',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.idParameter = this.activatedRoute.snapshot.paramMap.get('id');

    this.collaboratorsService.getCollaborator(this.idParameter).subscribe( (response: CollaboratorModel) => {
      this.collaborator = response.Apellidos + ' ' + response.Nombres;
    });

    this.modalService.getEvaluations().subscribe( (response: ModalModel[]) => {
    this.evaluations = response.filter(x => x.idCollaborator === this.idParameter).sort((a, b) => (a.Ano > b.Ano) ? 1 : -1);

    this.evaluations.forEach( element => {
      const data = [ +element.Autonomia, +element.Comunicacion, +element.Liderazgo, +element.TrabajoEnEquipo];
      const newradarChartData = { data , label: element.Ano};
      this.radarChartData.push(newradarChartData);
    });

    Swal.close();
    });
  }

  back() {
    this.router.navigate( ['/collaborator', this.idParameter]);
  }

  SetCompetition(competition: string) {
    this.competition = competition;
    this.lineChartLabels = [ ];
    this.lineChartData = [ ];

    let newlineChartData: any;
    const data: number[] = [];

    this.evaluations.forEach( element => {
      data.push(element[competition]);
      this.lineChartLabels.push(element.Ano);
    });

    newlineChartData = { data , label: competition};
    this.lineChartData.push(newlineChartData);
  }
}
