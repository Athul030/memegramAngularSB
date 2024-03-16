import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-piechart',
  templateUrl: './admin-piechart.component.html',
  styleUrls: ['./admin-piechart.component.css']
})
export class AdminPiechartComponent implements OnInit {

  chartData: any[] = [];

  
  
  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.fetchProviderChartData();
  }
  fetchProviderChartData() {
    this.service.getProviderChartData().subscribe(data => {

      this.chartData = Object.entries(data).map(([key,value])=>({name:key,value}));
    });
  }

}
