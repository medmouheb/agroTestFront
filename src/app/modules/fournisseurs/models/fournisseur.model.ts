export type Fournisseur = {
  id?: string;
  name?: string;
  type?: string;
  currencycode?: string; // currency code not exit in BE
  paymentTerm?: string;
  address?: string;
  codeCity?: string;
  nameCity?: string;
  wilayaName?: string;
  wilayaCode?: string; // willaya code missing in FE
  phone?: string;
  email?: string;
  code?: string;
  zipCode?: string;
  vendorSKU?: any;
  vendorSKUname?: any;
  vendorSKUcode?: any;
  shippingAddress?: string;
  shippingCity?: string;
  currencyname?: any;
};
