import { Component, OnInit } from "@angular/core";
import { GanttDependency } from "@progress/kendo-angular-gantt";
import { SimulatorService } from "app/components/service/simulator.service";
import { Task, tasks, dependencies } from "../data";

@Component({
  selector: "app-simulator-results",
  templateUrl: "./simulator-results.component.html",
  styleUrls: ["./simulator-results.component.scss"],
})
export class SimulatorResultsComponent implements OnInit {
  public data: Task[] = tasks;
  public dependencies: GanttDependency[] = dependencies;

  constructor(private simulatorService: SimulatorService) {}

  cards = [];
  ngOnInit(): void {
    this.simulatorService
      .simulate(
        localStorage.getItem("simulator-country"),
        localStorage.getItem("simulator-area"),
        localStorage.getItem("simulator-product"),
      )
      .subscribe((res: any) => {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          const numberOfOperations = element.operations
            ? Object.keys(element.operations).length
            : 0;
          this.cards.push({
            id: index + 1,
            name: element.product,
            flag: numberOfOperations,
            people: 99,
          });
        }
      });
  }
}
