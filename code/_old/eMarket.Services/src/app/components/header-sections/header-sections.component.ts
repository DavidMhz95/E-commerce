import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'header-sections',
  templateUrl: './header-sections.component.html',
  styleUrls: ['./header-sections.component.scss']
})
export class HeaderSectionsComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

}
