import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberSeparator",
})
export class NumberSeparatorPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) {
      return "";
    }

    const separator = ","; // Set your desired separator character
    const decimalSeparator = "."; // Set your desired decimal separator character

    const parts = Number(value).toFixed(2).toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const decimalPart = parts[1];

    return `${integerPart}${decimalSeparator}${decimalPart}`;
  }
}
