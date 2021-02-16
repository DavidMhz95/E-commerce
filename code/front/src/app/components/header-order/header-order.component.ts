import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'header-order',
  templateUrl: './header-order.component.html',
  styleUrls: ['./header-order.component.scss']
})
export class HeaderOrderComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

}
