import { Injectable } from '@angular/core';
import { Product, ProductComponent } from '../components/product/product.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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
      section:"morena",
      subsection:"tops",
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
      section:"morena",
      subsection:"tops",
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
      section:"morena",
      subsection:"tops",
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
      section:"morena",
      subsection:"tops",
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
      section:"rubia",
      subsection:"tops",
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
      section:"rubia",
      subsection:"tops",
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
      section:"rubia",
      subsection:"tops",
    },
    {
      id: 10,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM8_900x.jpg?v=1572199192","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM12_900x.jpg?v=1572199249", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM10_900x.jpg?v=1572199249", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM11_900x.jpg?v=1572199249"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section:"morena",
      subsection:"crop hoodie",
    },
    {
      id: 11,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM783_2048x.jpg?v=1585061089","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM8102_2048x.jpg?v=1585061097","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM789_900x.jpg?v=1585061097","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM813_900x.jpg?v=1585061097","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM822_900x.jpg?v=1585061097"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section:"rubia",
      subsection:"leggings",
    },
    {
      id: 12,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM17_900x.jpg?v=1572201738","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM18_900x.jpg?v=1572201738"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section:"morena",
      subsection:"leggings",
    },
    {
      id: 13,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM87_2048x.jpg?v=1572199610","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM90_2048x.jpg?v=1572199660"],
      description: "Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia.",
      details: ["Máxima comodidad", "Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano", "Lavar a máquina en frío", "Secado natural"],
      stockNumber: 3,
      section:"maromaso",
      subsection:"sudaderas",
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
      section:"maromaso",
      subsection:"tirantes",
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
      section:"maromaso",
      subsection:"camisolas",
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

}

export interface marketInformation {
  nameInformation: string
  descriptionInformation: string
}

export interface Section {
  title: string
  sections: Section[]
}