import { Injectable } from '@angular/core';
import { Product } from '../components/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  products:Product[] = [
    {
      id:5,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.3,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM21_900x.jpg?v=1572202163","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM22_900x.jpg?v=1572202163"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:4,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM331_900x.jpg?v=1585049777","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM333_900x.jpg?v=1585049777"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 0
    },
    {
      id:0,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.56,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM39_900x.jpg?v=1572200961","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM40_900x.jpg?v=1572200961","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM41_900x.jpg?v=1572200961", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM43_900x.jpg?v=1572200961"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:1,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images:["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM26_900x.jpg?v=1572201513","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM31_900x.jpg?v=1572201513" , "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM30_1296x.jpg?v=1572960905", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM29_1296x.jpg?v=1572960905"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:2,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:3,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM668_2048x.jpg?v=1585055696", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM667_50eb4083-4ef1-4317-9449-30b5e89b304f_2048x.jpg?v=1585055696"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 10
    },
    {
      id:6,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images:["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM26_900x.jpg?v=1572201513","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM31_900x.jpg?v=1572201513" , "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM30_1296x.jpg?v=1572960905", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM29_1296x.jpg?v=1572960905"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:7,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM1_900x.jpg?v=1572201995", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM2_900x.jpg?v=1572201995"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
    {
      id:8,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM668_2048x.jpg?v=1585055696", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM667_50eb4083-4ef1-4317-9449-30b5e89b304f_2048x.jpg?v=1585055696"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 5
    },
    {
      id:9,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM331_900x.jpg?v=1585049777","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM333_900x.jpg?v=1585049777"],
      description:"Presentamos nuestro LONG TOP, tu segunda piel en cada entrenamiento. Confeccionado para proporcionar la máxima comodidad y ligereza en cada sesión de entrenamiento.Desarrollado en la mezcla de fibras de políestery elastano perfecta, dotando al LONG TOP de mayor elasticidad y gran durabilidad. Comodidad absoluta sin renunciar al mejor estilo y evitando cualquier tipo de transparencia." ,
      details:["Máxima comodidad","Logo impreso", "Diseño granulado", "Elástico y flexible", "Sin transparencias", "Durabilidad garantizada", "Costuras de doble refuerzo", "Color BLACK"],
      moreDetails: ["Políester, elastano","Lavar a máquina en frío","Secado natural"],
      stockNumber: 3
    },
  ]

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

  
  info: marketInformation[] = [
    {
      nameInformation:"Envio",
      descriptionInformation: "Todos nuestras colecciones y lanzamientos son especiales, limitando el numero de unidades para tratar de dar a todos nuestros clientes la mayor exclusividad. No te quedes sin tus productos favoritos y entérate de todos nuestros nuevos lanzamientos en nuestra newsletter y nuestras rrss."
    },
    {
      nameInformation:"Informacion",
      descriptionInformation: "La seguridad y el bienestar de nuestro personal y clientes es primordial, y por ello hemos tomado todas las medidas que esta situación excepcional requiere, siempre bajo las indicaciones de las autoridades, para poder seguir ofreciendo nuestros servicios con la mayor seguridad. De igual forma, la compañía de transporte con la que trabajamos ha reforzado sus procedimientos de entrega para garantizar la seguridad de sus empleados y nuestros clientes."
    },
    {
      nameInformation:"Envio Premium",
      descriptionInformation: "Todos nuestras colecciones y lanzamientos son especiales, limitando el numero de unidades para tratar de dar a todos nuestros clientes la mayor exclusividad. No te quedes sin tus productos favoritos y entérate de todos nuestros nuevos lanzamientos en nuestra newsletter y nuestras rrss."
    }
  ]

}

export interface marketInformation {
  nameInformation: string
  descriptionInformation: string
}

export interface Section{
  title:string
  sections:Section[]
}