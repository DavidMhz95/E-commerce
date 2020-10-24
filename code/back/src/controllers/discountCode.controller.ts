import { saveDiscountCode } from '../elastic';
import { DiscountApplication, DiscountCode } from '../models/discountCode';
import { ObjectType } from '../models/enum';

const esb = require('elastic-builder'); // the builder

export interface DiscountCodeController {
    create: Function
}

export var controller: DiscountCodeController = {
    create: (req: any, res: any) => create(req, res)
}

function create(req, res) {
    //Control de errores
    if (req.body.code != undefined) {
        if (req.body.value != undefined) {
            if (req.body.discountType != undefined) {

                //Crear código de descuento
                var discountCode: DiscountCode = {
                    code: req.body.code,
                    discountType: req.body.discountType,
                    value: req.body.value,
                    application: req.body.application.key,
                    repetitions: req.body.repetitions,
                    customers: req.body.customers,
                    products: req.body.products,
                    section: req.body.section,
                    subsection: req.body.subsection,
                    minPurchase: req.body.minPurchase,
                    color: req.body.color,
                    dateFrom: req.body.dateFrom,
                    dateTo: req.body.dateTo,
                    type: ObjectType.DiscountCode
                }

                //Guardar
                saveDiscountCode(discountCode).then(() => {
                    return res.status(201).send(discountCode)
                }, (error: any) => {
                    return res.status(400).send(error);
                })

            } else {
                return res.status(400).send('Falta typo de descuento descuento.');
            }
        } else {
            return res.status(400).send('Valor de descuento no introducido.');
        }
    } else {
        return res.status(400).send('Código de descuento no introducido.');
    }
}

module.exports = controller;





