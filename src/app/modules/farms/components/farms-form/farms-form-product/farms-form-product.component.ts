import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Farm } from 'app/modules/farms/models/farm';
import { Produit } from 'app/modules/produits/models/produit.model';
import { ProduitsService } from 'app/modules/produits/services/produits.service';

@Component({
  selector: 'app-farms-form-product',
  templateUrl: './farms-form-product.component.html',
  styleUrls: ['./farms-form-product.component.scss']
})
export class FarmsFormProductComponent implements OnInit {
  @Input() farm!: Farm
  produits: Array<Produit> = [];

  farms = {
    product: '',
    land: 0
  };

  elements: any[] = [
    {
      product: '',
      land: 0
    }
  ];

  constructor(private produitserv:ProduitsService, private sharedservice:SharedService) { }

  ngOnInit(): void {
    console.log(this.farm.properties)
    if (this.farm.properties!=null){
      this.elements=this.farm.properties

    }
  
    this.getallParoduct()
  }

  getallParoduct(){
    this.produitserv.findAll().subscribe({
      next:(res)=>(console.log(res),this.produits=res
         
        ),
      error: (error) => console.error(error),
  
    })
    
  }
 
setvalue(){
  let la=0
  for (const element of this.elements) {
    console.log(element.land) 
    la += element.land;
    if (la> 100){
      this.sharedservice.setIsActive(false)
    }else{
      this.sharedservice.setIsActive(true)
    }
  }
}


  add:boolean=false
  ajouterElement() {
   
    let landIs100 = false; 
    let landIs10 = false; 
  
    let sumLand = 0
    for (const element of this.elements) {
      console.log(element.land) 
      
      sumLand += element.land;
      console.log(sumLand)
      if( (element.land >= 100)||(sumLand >=100)) {
        landIs100 = true;
       
        break; 
      }else if ((sumLand ==100)||(element.land == 0)) {
        landIs10 = true;
        break; 
      }
    
    }
  
    if (landIs100) {
     
      this.add = true;
    } else {
      this.add = false;
      this.elements.push({ product: '', land: 0 });
      console.log(this.elements);
    }
    this.farm.properties=this.elements
    console.log(this.farm.properties);

  }

  supprimerLigne(index: number) {
   
    this.elements.splice(index, 1); 
  }


  setProduct(e:any){
    console.log("aa::",this.produits)
    this.farm.land=e.target.value

  }
}
