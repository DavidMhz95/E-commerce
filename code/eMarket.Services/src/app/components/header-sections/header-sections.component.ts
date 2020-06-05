import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-sections',
  templateUrl: './header-sections.component.html',
  styleUrls: ['./header-sections.component.scss']
})
export class HeaderSectionsComponent implements OnInit {

  public sections:Section[]=[{
    title:"hombre",
    sections:[{
      title:"seccion A",
      sections:[]
    }, {
      title:"seccion B",
      sections:[]
    },{
      title:"seccion C",
      sections:[]
    }]
  },{
    title:"mujer",
    sections:[{
      title:"seccion A",
      sections:[]
    }, {
      title:"seccion B",
      sections:[]
    },{
      title:"seccion C",
      sections:[]
    }],
  }]

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Section{
  title:string
  sections:Section[]
}