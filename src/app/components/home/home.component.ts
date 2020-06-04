import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  }

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result)
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.recovered
              }
            })
            this.initChart();
          }
        }
      )
  }
  initChart() {
    let datatable = [];
    datatable.push(["Country", "Cases"]);
    this.globalData.forEach(cs => {
      if (cs.confirmed > 20000)
        datatable.push([
          cs.country, cs.confirmed
        ])
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    }
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    }
  }

  /* updateChart(input: HTMLInputElement){
    console.log(input.value)
  } */


}
