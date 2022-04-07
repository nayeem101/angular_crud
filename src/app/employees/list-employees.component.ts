import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  //properties
  employees!: Employee[];
  filteredEmployees!: Employee[];
  error!: string;
  alertMsg: string = 'msg';
  showAlert = false;

  private _searchTerm!: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployeesFunc(value);
  }

  //constructor
  constructor(private _route: ActivatedRoute) {
    const resolvedData: Employee[] | string =
      this._route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    //? observable approach to read queryParams
    this._route.queryParamMap.subscribe((queryParams) => {
      if (
        queryParams.has('searchTerm') &&
        queryParams.get('searchTerm') !== ''
      ) {
        const term = queryParams.get('searchTerm');
        if (term) this.searchTerm = term;
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  //ngOnInit life cycle hook
  ngOnInit(): void {
    //? snapshot approach to read queryParams
    /* if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      const term = this._route.snapshot.queryParamMap.get('searchTerm');
      console.log(term);
      if (term) this.searchTerm = term;
    } else {
      console.log('else executed');
      this.filteredEmployees = this.employees;
    } */
  }

  filterEmployeesFunc(searchStr: string) {
    return this.employees.filter((emp) => {
      return emp.name.toLowerCase().includes(searchStr.toLowerCase());
    });
  }

  onDeleteNotification(id: number) {
    this.alertMsg = `Employee with id : ${id} is deleted`;
    this.showAlert = true;
    const index = this.filteredEmployees.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }

  //in pure pipes a pure change is either change to a primitive value or
  // a change in object reference (Array, Date, Object)
  //a pure pipe is not executed when input is an obeject and only its
  // property values are changed

  /*  handleNotify(eventData: Employee) {
    console.log(eventData.name);
    this.dataFromChild = eventData;
  } */
}
