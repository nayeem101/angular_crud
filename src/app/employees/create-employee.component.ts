import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm!: NgForm;

  departments: Department[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Management' },
    { id: 4, name: 'Help Desk' },
  ];
  datePickerConfig: Partial<BsDatepickerConfig>;
  previewPhoto: boolean = false;
  panelTitle!: string;

  employee: Employee = {
    id: null,
    name: '',
    gender: '',
    email: '',
    phoneNumber: '',
    contactPref: '',
    isActive: false,
    department: 'select',
    dateOfBirth: new Date(1990, 0, 1),
    photoPath: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY',
        showWeekNumbers: false,
        minDate: new Date(1990, 0, 1),
        maxDate: new Date(2000, 0, 1),
      }
    );
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getEmployee(+id);
      }
    });
  }

  private getEmployee(id: number) {
    if (id === null || id == 0) {
      this.employee = {
        id: null,
        name: '',
        gender: '',
        email: '',
        phoneNumber: '',
        contactPref: '',
        isActive: false,
        department: 'select',
        dateOfBirth: new Date(1990, 0, 1),
        photoPath: '',
        password: '',
        confirmPassword: '',
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm?.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this.employeeService.getEmployee(+id).subscribe({
        next: (employee) => {
          employee.dateOfBirth = new Date(employee.dateOfBirth);
          this.employee = employee;
        },
        error: (err) => console.log(err),
      });
    }
  }

  saveEmployee(): void {
    if (this.employee.id === null) {
      //add new employee
      this.employeeService.addEmployee(this.employee).subscribe({
        next: (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      //update Employee
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: () => {
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  togglePreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
