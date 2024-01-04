import DataSource from 'devextreme/data/data_source';
import { Service } from 'src/app/app.service'; 
import { ApiDataService } from 'src/app/services/api-data.service'; 
import { Component, ChangeDetectionStrategy } from '@angular/core';

interface ITab {
  title: string;
  content: any;
  removable: boolean;
  disabled: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [Service],
})
export class TableComponent {

  dataSource: DataSource;

  // constructor(service: Service) {
  //   this.dataSource = service.getDataSource();
  // }
  tableData: any;
  constructor(private apidata: ApiDataService, service: Service) {
    this.dataSource = service.getDataSource();

    apidata.getData().subscribe((res) => {
      // console.log("apidata:", res);
      this.tableData = res;
    })
  }

  tabs: ITab[] = [
    // { title: 'Dynamic Title 1', content: 'Dynamic content 1', removable: false, disabled: false},
    // { title: 'Dynamic Title 2', content: 'Dynamic content 2', removable: false, disabled: false},
    // { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true, disabled: false}
  ];

  
  currentRowData: any;

  printDa(event?: any) {
    this.currentRowData = event;
    // console.log("prindata", this.currentRowData);
  }

  addNewTab(event?: any) {
    
    // get single data:
    // this.apidata.getSingle(event.data.id).subscribe((res) => {
    //   console.log("getSingle apidata:", res);
    // })

    this.apidata.getSingle(event.data.id).subscribe({
      next:(res:any) => {
        console.log("individual employee apidata:", res);
        alert(res.success);
      },
    })

    // console.log("addNewTab", event);

    const newTabIndex = this.tabs.length + 1;
    this.tabs.push({
      title: `Dynamic Title ${newTabIndex}`,
      content: event.data,
      active:true,
      disabled: false,
      removable: true
    });
  }


// for delete button
  deleteRow(event?: any) {
    // console.log("deleteRow", event);
    
    if(confirm('do you want to delete?')){
      // alert(`${event.data.name} info deleted!`)
      
      this.apidata.deleteEmployee(event.data.id).subscribe({
        next: (res:any) => {
          console.log("deleted response:", res);
          alert(res.message);
        },
      })

      // this.apidata.deleteEmployee(event.data.id).subscribe((res) => {
      //   console.log("deleted response:", res);
      // })

      console.log("row deleted")
    }
  }

  editRow(event?: any) {
    // console.log("editRow", event);
    // prompt('do you want to delete?')
  }

  removeTabHandler(tab: ITab): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    console.log('Remove Tab handler');
  }

  selectTabHandler(index: number): void {
    this.tabs[index].active = true;
  }

}
