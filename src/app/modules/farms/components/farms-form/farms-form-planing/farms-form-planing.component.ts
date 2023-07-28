import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'app/modules/farms/models/farm';
import { Warehouse } from 'app/modules/warehouse/models/warehouse.model';
import { WarehouseService } from 'app/modules/warehouse/services/warehouse.service';

@Component({
  selector: 'app-farms-form-planing',
  templateUrl: './farms-form-planing.component.html',
  styleUrls: ['./farms-form-planing.component.scss']
})
export class FarmsFormPlaningComponent implements OnInit {
  @Input() farm!: Farm
  warehouses: Array<Warehouse> = [];

  constructor(
    private warehouseservice:WarehouseService

  ) { }

  ngOnInit(): void {
    this.getallwearhouse()
  }
getallwearhouse(){
  this.warehouseservice.findAll().subscribe(data=>{
    this.warehouses=data
    console.log(data)

  },error=>console.log(error))
}
}
