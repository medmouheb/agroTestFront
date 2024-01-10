export type Commande = {
  id?: string;
  paymentTermCode?: any;
  paymentTermName?: string;
  dateSold?: Date;
  daysAfterCurrentMonth?: any;
  deliveryDate?: Date;
  invoiceDate?: Date;
  receiveDate?: Date;
  shipDate?: Date;

  termDays?: number;
  termMonth?: number;
  discountRate?: number;
  discountDays?: number;
  prepay?: boolean;
  notes?: string;
  schedulePay?: boolean;
  taxDistribution?: string;
  scheduleBasis?: string;
  paymentTerm?: {
    paymentCount?: number;
    scheduleBasisUnit?: string;
    paymentRate?: number;
  };
};
