import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input('productsData') productsData:any 
  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

  
}


