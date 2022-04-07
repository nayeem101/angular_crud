import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  private _id!: number;
  employee!: Employee;

  constructor(
    private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //we may have unsubscribe to some observables but
    // the ActivatedRoute observable doesn't need that
    // angular router takes care of that
    this._route.paramMap.subscribe((params) => {
      this._id = Number(params.get('id'));
      this._employeeService.getEmployee(this._id).subscribe({
        next: (employee) => (this.employee = employee),
        error: (err) => console.log(err),
      });
    });
  }

  viewNextEmployee() {
    this._id++;
    this._router.navigate(['/employees', this._id], {
      queryParamsHandling: 'preserve',
    });
  }
}
