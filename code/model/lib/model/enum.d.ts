export interface IObjectyType {
    type: ObjectType;
}
export declare enum ObjectType {
    User = 0,
    Product = 1,
    Order = 2,
    DiscountCode = 3
}
export declare enum orderState {
    Realizado = 0,
    Preparado = 1,
    Enviado = 2,
    Entregado = 3,
    Solicita_Devolucion = 4,
    Devuelto = 5
}
