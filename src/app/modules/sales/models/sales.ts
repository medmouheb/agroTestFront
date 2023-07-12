import { Currency } from "app/modules/currency/models/currency"

export type Sales ={

    id?: string
    code?: string
    name?: string
    type?: string
    
    currency?: Currency
    payment_Term?:any
  

}