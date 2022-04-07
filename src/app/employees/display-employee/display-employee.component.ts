import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css'],
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() searchTerm!: string;
  @Input() employee!: Employee;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  selectedEmployee!: number;
  confirmDelete = false;
  //child component uses events to pass data to parent component
  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) this.selectedEmployee = +id;
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {
        searchTerm: this.searchTerm,
      },
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(Number(this.employee.id)).subscribe({
      next: () =>
        console.log(`Employee with id : ${this.employee.id} is deleted`),
      error: (err) => console.log(err),
    });
    this.notifyDelete.emit(Number(this.employee.id));
  }

  /* getEmployeeName(): string {
    return `${this.employee.name} ${this.employee.gender}`;
  } */

  /* handleClick() {
    this.notify.emit(this.employee);
  } */

  //for input change detection
  // private _employee!: Partial<Employee>;

  /* @Input()
  set employee(val: Partial<Employee>) {
    // console.log(`Previous : ${this._employee?.name}`);
    // console.log(`Current : ${val.name}`);
    this._employee = val;
  }
  get employee(): Partial<Employee> {
    return this._employee;
  } */

  //ng input property change detection using ngOnChanges life cycle
  /* ngOnChanges(changes: SimpleChanges): void {
    const prevEmployee = <Employee>changes?.['employee'].previousValue;
    const currEmployee = <Employee>changes?.['employee'].currentValue;

    console.log(`Previous : ${prevEmployee?.name}`);
    console.log(`Current : ${currEmployee.name}`);
  } */
}
