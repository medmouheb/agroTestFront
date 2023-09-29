import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'app/modules/farms/models/farm';
import { LogisticUnit } from 'app/modules/logistic-unit/models/logistic-unit';
import { LogisticUnitService } from 'app/modules/logistic-unit/services/logistic-unit.service';
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
  logistics: Array<LogisticUnit> = [];

  constructor(
    private warehouseservice: WarehouseService,
    private logisticsService: LogisticUnitService

  ) { }

  ngOnInit(): void {
    this.getallwearhouse()
    this.getalllogistics()
  }
  getallwearhouse() {
    this.warehouseservice.findAll().subscribe(data => {
      this.warehouses = data
      console.log(data)

    }, error => console.log(error))
  }

  getalllogistics() {
    this.logisticsService.findAll().subscribe(data => {
      this.logistics = data
      console.log(data)

    }, error => console.log(error))
  }

  selectValue(e:any){
    this.farm.logistic=e.target.value
  }

  selectValue1(e:any){
    
    this.farm.warehouseprimary=e.target.value
  }
  
}
