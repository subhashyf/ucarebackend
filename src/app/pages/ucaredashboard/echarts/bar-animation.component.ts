import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar-animation',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarAnimationComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const xAxisData = [];
      const sleep = [];
      const step = [];
      const stress = [];
      const calorie = [];
      const ecg = [];

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: ['#FF0000', '#00F0F0', '#00FF00', '#000F00', '#0000FF'],
        legend: {
          data: ['sleep', 'step', 'stress', 'calorie', 'ecg'],
          align: 'left',
          textStyle: {
            color: echarts.textColor,
          },
        },
        tooltip: {
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            color: '#000',
            fontWeight: 'normal',
            fontSize: '8px',
          },
          position: 'top',
          backgroundColor: '#FFF',
          borderColor: '#AAA',
          borderWidth: '2px',
        },
        xAxis: [
          {
            data: xAxisData,
            silent: false,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'sleep',
            type: 'bar',
            data: sleep,
            animationDelay: idx => idx * 10,
          },
          {
            name: 'step',
            type: 'bar',
            data: step,
            animationDelay: idx => idx * 20,
          },
          {
            name: 'stress',
            type: 'bar',
            data: stress,
            animationDelay: idx => idx * 30,
          },
          {
            name: 'calorie',
            type: 'bar',
            data: calorie,
            animationDelay: idx => idx * 40,
          },
          {
            name: 'ecg',
            type: 'bar',
            data: ecg,
            animationDelay: idx => idx * 50,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };

      for (let i = 1; i < 101; i++) {
        xAxisData.push('Day ' + i);
        sleep.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        step.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        stress.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5 * -1);
        calorie.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5 * -1);
        ecg.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 9);
      }
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
