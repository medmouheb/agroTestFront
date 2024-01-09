import { Fournisseur } from "../../fournisseurs/models/fournisseur.model";
import { Warehouse } from "../../warehouse/models/warehouse.model";

export type Farm = {
  id?: string;
  code?: string;
  nom?: string;
  stage?: string;
  status?: boolean;
  growoutcode?: string;
  type?: string;
  cost_Center?: any;
  warehouse?: Warehouse;
  ferme_Type?: string;
  vendor?: Fournisseur;
  status_Construction?: string;
  num_Client?: string;
  manager_Code?: string;
  manager_name?: string;
  technician_Code?: string;
  technician_Name?: string;
  area_type?: string;
  owner_Name?: string;
  attachments?: string;
  comments?: string;
  address1?: string;
  address2?: string;
  customerCode?: string;
  customerName?: string;
  city_Code?: string;
  city_Name?: string;
  governorateCode?: string;
  governorateName?: string;
  zip_Code?: string;
  email?: string;
  deleted?: boolean;
  phoneNumber?: string;
  faxNumber?: string;
  farm_Area?: string;
  latitude?: number;
  longitude?: number;
  vendorcode?: string;
  warehousecode?: string;
  growout?: any
  product?: any
  telephone?: any
  land?: any
  planning?: any
  logistic?: any
  feedMillcode?: any
  primaryMarket?: any
  liveProductday?: any
  maxturckcapacity?: any
  payee?: any

  projectwarehouse?: any
  projectligistic?: any


  distnfarmlogi?: any
  distnfarmMarket?: any

  warehouseprimary?: any
  warehousesecondry?: any


  visitDate?: any
  firstNameVisit?: any
  lastNameVisit?: any
  iDNumberVisit?: any
  timeinVisit?: any
  timeoutVisit?: any
  purposeofthevisit?: any


  certifications?: any


  contractNumber?: any
  contratPay?: any
  startDateFarms?: any
  endDateFarms?: any
  renewalDateFarms?: any


  paymentType?: any//Checking, saving or paycheck 
  accountNumber?: any
  bankName?: any
  bankCode?: any
  bankaddress?: any
  directDepositflag?: any
  typepayment?: any//auto or not
  operationDate?: any //satesystem
  amounttransferred?: any

  ressourceInformation?: any
  statutInformation?: any
  adressInformation?: any
  firstNameInformation?: any
  lastNameInformation?: any
  phoneInformation?: any
  startDateInformation?: any
  endDateInformation?: any
  properties?:any
};





