import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CasosEnArgentinaService } from '../../../services/casos-en-argentina.service';
import ICase from '../../../interfaces/ICase';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  cantCasosEnMarzo: number = 0;
  cantCasosEnAbril: number = 0; 
  cantCasosEnMayo: number = 0;
  cantCasosEnJunio: number = 0;

  constructor(private theme: NbThemeService, private casosEnArgentinaService: CasosEnArgentinaService) {}

  ngAfterViewInit() {
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


      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Marzo', 'Abril', 'Mayo', 'Junio'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Casos',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.cantCasosEnMarzo, name: 'Marzo' },
              { value: this.cantCasosEnAbril, name: 'Abril' },
              { value: this.cantCasosEnMayo, name: 'Mayo' },
              { value: this.cantCasosEnJunio, name: 'Junio' },
              
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    }, (error: Error) => {
      console.log('ERROR: ', error);

    });

    const colors = config.variables;
    const echarts: any = config.variables.echarts;
    
  });
}


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
