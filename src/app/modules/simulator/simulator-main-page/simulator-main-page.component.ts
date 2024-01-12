import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SimulatorService } from "app/components/service/simulator.service";

@Component({
  selector: "app-simulator-main-page",
  templateUrl: "./simulator-main-page.component.html",
  styleUrls: ["./simulator-main-page.component.scss"],
})
export class SimulatorMainPageComponent implements OnInit {
  authenticationError = false;
  otherError = false;
  newProjectForm: FormGroup;
  productName: string;
  varietyName: string;
  country;
  area;

  constructor(
    private formBuilder: FormBuilder,
    private simulatorService: SimulatorService,
    private router: Router,
  ) {
    this.newProjectForm = this.formBuilder.group({
      farmName: ["", Validators.required],
      country: ["", Validators.required],
      area: ["", Validators.required],
      variety: ["", Validators.required],
      Subvariety: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    localStorage.setItem("simulator-country", this.country);
    localStorage.setItem("simulator-area", this.area);
    localStorage.setItem("simulator-product", this.selectedProducts.toString());

    this.router.navigate(["/simulatorMain/results"]);
  }
  selectedProducts: string[] = [];

  onProductChange(event: any) {
    const checkbox = event.target;
    const productValue = checkbox.value;

    if (checkbox.checked) {
      // Add the selected product to the array
      this.selectedProducts.push(productValue);
    } else {
      // Remove the product from the array if unchecked
      const index = this.selectedProducts.indexOf(productValue);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
  }

  onSelectedProduct(value: string) {
    this.productName = value;
    localStorage.setItem("product", this.productName);
    if (this.productName == "POTATOES" || this.productName == "CEREALE") {
      localStorage.setItem("variety", this.varietyName);
    } else {
      localStorage.setItem("variety", "NONE");
    }
  }
  onSelectedCountry(value: string) {
    this.country = value;
  }
}
