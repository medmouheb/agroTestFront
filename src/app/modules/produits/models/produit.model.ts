import { Fournisseur } from "../../fournisseurs/models/fournisseur.model"
import { ProductUsage } from "./produit-usage.model"

export type Produit = {
  id?: string
  code?: string
  name?: string
  type?: string
  status?: boolean
  currency?: string
  Inventaire?: string
  Medicamenteux?: string
  Fabricant?: string
  couleur?: string
  methodeutilisation?: ProductUsage
  maxdepasse?: string
  prixUnitaireHt?: any
  tauxTva?: any
  prixUnitaireTtc?: any
  category?: any
  vendorSKU?: any
  salesSKU?: any
  fournisseur?: Fournisseur
}
