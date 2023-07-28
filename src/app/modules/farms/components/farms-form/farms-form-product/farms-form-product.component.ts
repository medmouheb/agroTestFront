import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private produitserv:ProduitsService) { }

  ngOnInit(): void {
    this.getallParoduct()
  }

  getallParoduct(){
    this.produitserv.findAll().subscribe({
      next:(res)=>(console.log(res),this.produits=res
         
        ),
      error: (error) => console.error(error),
  
    })
  }
}
