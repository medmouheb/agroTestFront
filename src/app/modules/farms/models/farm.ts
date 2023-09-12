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
  phonefix?: any
  land?: any
  planning?: any
  logistic?: any
  feedMillcode?: any
  primaryMarket?: any
  liveProductday?: any
  maxturckcapacity?: any
  payee?: any
  //projection
  projectwarehouse?: any
  projectligistic?: any

  //distance
  distnfarmlogi?: any
  distnfarmMarket?: any

  warehouseprimary?: any
  warehousesecondry?: any

  //Visitors Logs
  VisitDate?: any
  FirstNameVisit?: any
  LastNameVisit?: any
  IDNumberVisit?: any
  TimeinVisit?: any
  TimeoutVisit?: any
  Purposeofthevisit?: any

  //cezrtiff
  Certifications?: any

  //Contract Farms
  ContractNumber?: any
  contratPay?: any
  startDateFarms?: any
  endDateFarms?: any
  renewalDateFarms?: any

  //Paiement information
  PaymentType?: any//Checking, saving or paycheck 
  AccountNumber?: any
  BankName?: any
  BankCode?: any
  Bankaddress?: any
  DirectDepositflag?: any
  typepayment?: any//auto or not
  OperationDate?: any //satesystem
  amounttransferred?: any
  //Resource Information
  ressourceInformation?: any
  statutInformation?: any
  adressInformation?: any
  FirstNameInformation?: any
  LastNameInformation?: any
  phoneInformation?: any
  startDateInformation?: any
  endDateInformation?: any
};





