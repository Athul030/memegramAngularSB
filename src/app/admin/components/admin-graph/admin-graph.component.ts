import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

interface GroupedData {
  [key: string]: number;
}

@Component({
  selector: 'app-admin-graph',
  templateUrl: './admin-graph.component.html',
  styleUrls: ['./admin-graph.component.css']
})
export class AdminGraphComponent implements OnInit {

  
  chartData2: any[] = [];
  
  lineChartOptions: any = {
    view: [800, 400],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Date',
    showYAxisLabel: true,
    yAxisLabel: 'Number of Posts',
    timeline: false,
    autoScale: true,
    
  };

  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.fetchPostsChartData();
  }
  
  fetchPostsChartData() {
    this.service.getPostsChartData().subscribe(data => {
     
      const groupedData = this.groupDataByDate(data);
      console.log("posts",groupedData);
      this.chartData2 = [
        {
          name: 'Posts',
          series: Object.entries(groupedData).map(([key, value]) => ({
            name: new Date(key),
            value: value
          }))
        }
      ];
    });
  }

  groupDataByDate(data: GroupedData): GroupedData {
    return Object.entries(data).reduce((groups: GroupedData, [timestamp, count]) => {
      const date = new Date(timestamp).toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = 0;
      }
      groups[date] += count;
      return groups;
    }, {});
  }

  tooltipText(data:{name:Date,value:number}):string{
    return `${data.name.toDateString()}:${data.value}`;
  }

}
