import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  titleCard1: string =environment.titleCard1;
  titleCard2: string =environment.titleCard2;
  titleCard3: string =environment.titleCard3;
  titleCard4: string =environment.titleCard4;

  @Input() averageArea;
  @Input() averageProduction;
  @Input() averageExportationPrice;
  @Input() averageQuantity;


  constructor() { }
  ngOnInit(): void {
    this.averageArea = this.formatNumberWithSeparators(this.averageArea);
  }
   formatNumberWithSeparators(number: number): string {
    const separator = ','; // Set your desired separator character
    const decimalSeparator = '.'; // Set your desired decimal separator character
  
    const parts = number.toFixed(2).toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const decimalPart = parts[1];
  
    return `${integerPart}${decimalSeparator}${decimalPart}`;
    
  }

}
