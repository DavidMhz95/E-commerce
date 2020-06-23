import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-properties-product-table',
  templateUrl: './properties-product-table.component.html',
  styleUrls: ['./properties-product-table.component.scss']
})
export class PropertiesProductTableComponent implements OnInit {

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input('properties') properties: any
  
    ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.properties
    }
  
    displayedColumns: string[] = ['id',  'name', 'addSubproperties', 'update', 'delete' ];
    dataSource = new MatTableDataSource();
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    deleteProduct(id){
      //Hay que borrar de dataService?.products pero lo borro del input de momento pa no borrar mil productos jeje
      for(let i in this.dataSource.data){
        console.log(this.dataSource.data[i]); 
      }
  
    }

    addSubproperties(id){

    }
  
    updateProduct(id){
      console.log(id)
    }
}
