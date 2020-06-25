import { Injectable } from '@angular/core';
import { Product, ProductComponent } from '../components/product/product.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { CartProduct } from './shopping-cart.service';
import { RandomDate } from 'src/app/app.utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  productTypes: ProductTypes[] = [
    {
      id: 0,
      name: 'Camisetas'
    },
    {
      id: 1,
      name: 'Pantalones Cortos'
    }
  ]

  properties: Properties[] = [
    {
      id: 0,
      name: 'Color'
    },
    {
      id: 2,
      name: 'Talla'
    }
  ]


  products: Product[] = [
    {
      id: 5,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.3,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM21_900x.jpg?v=1572202163", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM22_900x.jpg?v=1572202163"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "tops",
    },
    {
      id: 4,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM1_900x.jpg?v=1572201995", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM2_900x.jpg?v=1572201995"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "tops",
    },
    {
      id: 0,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.56,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM39_900x.jpg?v=1572200961", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM40_900x.jpg?v=1572200961", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM41_900x.jpg?v=1572200961", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM43_900x.jpg?v=1572200961"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "tops",
    },
    {
      id: 1,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM26_900x.jpg?v=1572201513", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM31_900x.jpg?v=1572201513", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM30_1296x.jpg?v=1572960905", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM29_1296x.jpg?v=1572960905"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "tops",
    },
    {
      id: 2,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "rubia",
      subsection: "tops",
    },
    {
      id: 3,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM668_2048x.jpg?v=1585055696", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM667_50eb4083-4ef1-4317-9449-30b5e89b304f_2048x.jpg?v=1585055696"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 10,
      section: "rubia",
      subsection: "tops",
    },
    {
      id: 9,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM331_900x.jpg?v=1585049777", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM333_900x.jpg?v=1585049777"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "rubia",
      subsection: "tops",
    },
    {
      id: 10,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM8_900x.jpg?v=1572199192", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM12_900x.jpg?v=1572199249", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM10_900x.jpg?v=1572199249", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM11_900x.jpg?v=1572199249"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "crop hoodie",
    },
    {
      id: 11,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM783_2048x.jpg?v=1585061089", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM8102_2048x.jpg?v=1585061097", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM789_900x.jpg?v=1585061097", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM813_900x.jpg?v=1585061097", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM822_900x.jpg?v=1585061097"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "rubia",
      subsection: "leggings",
    },
    {
      id: 12,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM17_900x.jpg?v=1572201738", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM18_900x.jpg?v=1572201738"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "morena",
      subsection: "leggings",
    },
    {
      id: 13,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM87_2048x.jpg?v=1572199610", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM90_2048x.jpg?v=1572199660"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "maromaso",
      subsection: "sudaderas",
    },
    {
      id: 14,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM68_7ba2f632-5651-42a3-ab69-6876d618075e_2048x.jpg?v=1573827531"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "maromaso",
      subsection: "tirantes",
    },
    {
      id: 15,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM141_9dce2da1-2398-47eb-a749-ff85699eccb0_2048x.jpg?v=1584986985"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section: "maromaso",
      subsection: "camisolas",
    }
  ]

  public sections: Section[] = [{
    title: "rubia",
    sections: [{
      title: "tops",
      sections: []
    }, {
      title: "leggings",
      sections: []
    }]
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
    },
    {
      name: "Sergio David Hasselhoff",
      email: "levantahierros69@gmail.com",
      image: "https://avatars2.githubusercontent.com/u/58731792?s=460&u=8836f461d6e0868af099b477a6d38c53c3159b44&v=4",
      totalSpent: 659.64,
    },
    {
      name: "Miguel Á. Rozalén",
      email: "rztop93@gmail.com",
      image: "https://avatars2.githubusercontent.com/u/19685231?s=460&u=16a48c0c0537610918d5ece0eab5272116073d66&v=4",
      totalSpent: 324.45,
    }
  ]

  public discounts: DiscountCode[] = [
    {
      application: DiscountApplication.Shipment,
      code: "FREEDELIVER",
      customers: undefined,
      repetitions: -1,
      type: DiscountType.AbsoluteValue,
      value: 3.45,
      products:undefined,
      section:undefined,
      subsection:undefined,
      minPurchase:0,
      color:undefined,
      dateFrom:undefined,
      dateTo:undefined
    },
    {
      application: DiscountApplication.Shipment,
      code: "20OFFSALE",
      customers: undefined,
      repetitions: 1,
      type: DiscountType.Percentage,
      value: 20,
      products:undefined,
      section:"Rubia",
      subsection:undefined,
      minPurchase:20,
      color:undefined,
      dateFrom:undefined,
      dateTo:undefined
    }
  ]

  public generateRandomOrders(number: number): Order[] {
    var result: Order[] = []
    for (var i = 0; i < number; i++) {
      var randomCustomer = Math.floor((Math.random() * this.customers.length))
      var randomProducts = Math.floor((Math.random() * 4)) + 1
      var randomId = Math.floor((Math.random() * 1000000))

      var products: CartProduct[] = []

      for (var j = 0; j < randomProducts; j++) {
        var randomProductId = Math.floor((Math.random() * this.products.length))
        var randomProductNumber = Math.floor((Math.random() * 2)) + 1
        products.push({
          product: this.products[randomProductId],
          number: randomProductNumber
        })
      }

      result.push({
        id: randomId,
        customer: this.customers[randomCustomer],
        products: products,
        date: RandomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString('es-ES')
      })
    }
    return result
  }
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

export interface ProductTypes {
  id: number
  name: string
}

export interface Customer {
  name: string
  image: string
  email: string
  totalSpent: number
}

export interface Order {
  id: number,
  date: string,
  customer: Customer,
  products: CartProduct[],
}

export interface DiscountCode {
  code: string
  type: DiscountType //Porcentaje, valor absoluto,
  value: number
  application: DiscountApplication //Envío, Productos, Categoria, Subcategoria, Todo
  repetitions: number
  customers: Customer[]
  products:Product[]
  section:string
  subsection:string
  minPurchase:number
  color:string
  dateFrom:Date
  dateTo:Date
}

export enum DiscountType {
  Percentage ="Porcentaje", 
  AbsoluteValue = "Valor",
}

export enum DiscountApplication {
  Shipment, Product, Section, Subsection, All
}