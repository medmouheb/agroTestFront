import { SalesSKU } from "app/modules/sales-sku/models/salesSku"
import { Fournisseur } from "../../fournisseurs/models/fournisseur.model"
import { ProductUsage } from "./produit-usage.model"

export type Produit = {
  id?: string
  code?: string
  name?: string
  type?: string
  statuss?: boolean
  currency?: string
  inventaire?: string
  medicamenteux?: Boolean
  fabricant?: string
  couleur?: string
  transactionDate?: string
  farmCode?: string
  houseCode?: string
  maxdepasse?: string
  prixUnitaireHt?: any
  tauxTva?: any
  prixUnitaireTtc?: any
  category?: any
  vendorSKU?: any
  salesSKU?: SalesSKU
  fournisseur?: Fournisseur
}
