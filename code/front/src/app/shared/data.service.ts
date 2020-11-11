import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { RandomDate } from 'src/app/app.utils';
import { Product } from '../models/product';
import { DiscountApplication, DiscountCode, DiscountType } from '../models/discountCode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.typeOfProduct[0].properties.set('Talla', ['S', 'M', 'L'])
    this.typeOfProduct[0].properties.set('Color', ['Rojo', 'Azul'])
    this.typeOfProduct[1].properties.set('Talla', ['S', 'XL'])
    this.typeOfProduct[1].properties.set('Color', ['Rojo', 'Azul'])
  }

  products: Product[] = []

  public sections: Section[] = [{
    title: "rubia",
    sections: [{
      title: "tops",
      sections: []
    }, {
      title: "leggings",
      sections: []
    }
    ]
  }, {
    title: "morena",
    sections: [{
      title: "tops",
      sections: []
    }, {
      title: "leggings",
      sections: []
    }, {
      title: "crop hoodie",
      sections: []
    }],
  }, {
    title: "maromaso",
    sections: [{
      title: "tirantes",
      sections: []
    }, {
      title: "pantalones",
      sections: []
    }, {
      title: "sudaderas",
      sections: []
    }, {
      title: "camisolas",
      sections: []
    }],
  }]


  info: marketInformation[] = [
    {
      nameInformation: "Envio",
      descriptionInformation: "Todos nuestras colecciones y lanzamientos son especiales, limitando el numero de unidades para tratar de dar a todos nuestros clientes la mayor exclusividad. No te quedes sin tus productos favoritos y entérate de todos nuestros nuevos lanzamientos en nuestra newsletter y nuestras rrss."
    },
    {
      nameInformation: "Informacion",
      descriptionInformation: "La seguridad y el bienestar de nuestro personal y clientes es primordial, y por ello hemos tomado todas las medidas que esta situación excepcional requiere, siempre bajo las indicaciones de las autoridades, para poder seguir ofreciendo nuestros servicios con la mayor seguridad. De igual forma, la compañía de transporte con la que trabajamos ha reforzado sus procedimientos de entrega para garantizar la seguridad de sus empleados y nuestros clientes."
    },
    {
      nameInformation: "Envio Premium",
      descriptionInformation: "Todos nuestras colecciones y lanzamientos son especiales, limitando el numero de unidades para tratar de dar a todos nuestros clientes la mayor exclusividad. No te quedes sin tus productos favoritos y entérate de todos nuestros nuevos lanzamientos en nuestra newsletter y nuestras rrss."
    }
  ]


  public customers: Customer[] = [
    {
      name: "Comandante Aranda",
      image: "https://avatars1.githubusercontent.com/u/28922716?s=460&u=9e4b0d836649dcc75d61f9457365b554fbcec22e&v=4",
      email: "mispanas@gmail.com",
      totalSpent: 1235.12,
      isSubscribed: true
    },
    {
      name: "Sergio David Hasselhoff",
      email: "levantahierros69@gmail.com",
      image: "https://avatars2.githubusercontent.com/u/58731792?s=460&u=8836f461d6e0868af099b477a6d38c53c3159b44&v=4",
      totalSpent: 659.64,
      isSubscribed: true
    },
    {
      name: "Miguel Á. Rozalén",
      email: "rztop93@gmail.com",
      image: "https://avatars2.githubusercontent.com/u/19685231?s=460&u=16a48c0c0537610918d5ece0eab5272116073d66&v=4",
      totalSpent: 324.45,
      isSubscribed: false
    }
  ]

  public typeOfProduct: TypeOfProduct[] = [
    {
      name: 'Camisetas',
      properties: new Dictionary(),
    },
    {
      name: 'Pantalones',
      properties: new Dictionary(),
    }
  ]

}

export interface marketInformation {
  nameInformation: string
  descriptionInformation: string
}

export interface Properties {
  id: number,
  name: string
}

export interface SubProperties {
  id: number,
  propertie: string,
  name: string,
  stock: number
}


export interface Section {
  title: string
  sections: Section[]
}

export interface TypeOfProduct {
  name: string,
  properties: Dictionary,
}

export interface Customer {
  name: string
  image: string
  email: string
  totalSpent: number
  isSubscribed: boolean
}

export interface TypeOfProduct {
  name: string,
  properties: Dictionary
}

export class Dictionary {
  items = {};
  constructor() {
    this.items = {};
  }
  public has(key) {
    return key in this.items;
  }
  public set(key, value) {
    this.items[key] = value;
  }
  public get(key) {
    return this.items[key];
  }
  public delete(key) {
    if (this.has(key)) {
      delete this.items[key]
      return true;
    }
    return false;
  }
}

