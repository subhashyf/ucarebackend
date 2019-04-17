import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-radar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsRadarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: ['#75dcdc', '#b881b8', '#efef8d', '#e54141', '#182424', '#fd00ff', '#547294', '#0e61f0', '#009900', '#f0810f'],//[colors.danger, colors.warning],
        tooltip: {},
        legend: {
          data: ['sleep', 'step', 'stress', 'calorie', 'ecg'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: [
            { name: 'Sleep', max: 500 },
            { name: 'Step', max: 500 },
            { name: 'Stress', max: 500 },
            { name: 'Calorie', max: 500 },
            { name: 'ECG', max: 500 },
          ],
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {
            name: 'Consumer Health Vault Data',
            type: 'radar',
            data: [
              {
                value: [430, 100, 280, 350, 500],
                name: 'Day - 1',
              },
              {
                value: [280, 350, 500, 430, 100],
                name: 'Day - 3',
              },
              {
                value: [500, 430, 100, 280, 350],
                name: 'Day - 5',
              },
              {
                value: [215, 50, 140, 175, 250],
                name: 'Day - 7',
              },
              {
                value: [140, 175, 250, 215, 50],
                name: 'Day - 9',
              },
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
