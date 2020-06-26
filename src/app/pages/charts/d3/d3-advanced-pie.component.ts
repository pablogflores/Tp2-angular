import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CasosEnArgentinaService } from '../../../services/casos-en-argentina.service';
import ICase from '../../../interfaces/ICase';


@Component({
  selector: 'ngx-d3-advanced-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieComponent implements OnDestroy {
  cantCasosEnMarzo: number = 0;
  cantCasosEnAbril: number = 0; 
  cantCasosEnMayo: number = 0;
  cantCasosEnJunio: number = 0;
  single = [
    {
      name: 'Marzo',
      value: this.cantCasosEnMarzo,
    },
    {
      name: 'Abril',
      value: this.cantCasosEnAbril,
    },
    {
      name: 'Mayo',
      value: this.cantCasosEnMayo,
    },
    {
      name: 'Junio',
      value: this.cantCasosEnJunio,
    },
 
  ];

  
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private casosEnArgentinaService: CasosEnArgentinaService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    
      this.casosEnArgentinaService.getAll().subscribe((casosEnArgentina: Array<ICase>) => {
        console.log('CASOS EN ARGENTINA: ', casosEnArgentina);
        // 29 dias para marzo
        // empieza el dia 3 -> elemento 0
        console.log('ultimo caso en marzo:', casosEnArgentina[28]);
        this.cantCasosEnMarzo = casosEnArgentina[28].Cases - casosEnArgentina[0].Cases;
        console.log('cant. casos marzo:', this.cantCasosEnMarzo);
        // 30 dias para abril
        console.log('ultimo caso en abril:', casosEnArgentina[58]);
        this.cantCasosEnAbril = casosEnArgentina[58].Cases - casosEnArgentina[29].Cases;
        console.log('cant. casos abril:', this.cantCasosEnAbril);
        // 31 dias para mayo
        console.log('ultimo caso en mayo:', casosEnArgentina[89]);
        this.cantCasosEnMayo = casosEnArgentina[89].Cases - casosEnArgentina[59].Cases;
        console.log('cant. casos mayo:', this.cantCasosEnMayo);
          //Domingo 22 de junio
        console.log('ultimo caso en mayo:', casosEnArgentina[110]);
        this.cantCasosEnJunio = casosEnArgentina[110].Cases - casosEnArgentina[89].Cases;
        console.log('cant. casos mayo:', this.cantCasosEnJunio);

        

      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
       

      };
      (error: Error) => {
        console.log('ERROR: ', error);
      }  

    });
    

  });
}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
