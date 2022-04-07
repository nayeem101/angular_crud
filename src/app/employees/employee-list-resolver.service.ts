import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { ResolvedEmployeeList } from '../models/resolved-employeelist.mode';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeListResolverService
  implements Resolve<Employee[] | string>
{
  constructor(private _employeeService: EmployeeService) {}
  //? when a resolver returns an observable then it automatically
  //? subscribes to the observable
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Employee[] | string> {
    return this._employeeService
      .getEmployees()
      .pipe(catchError((err: string) => of(err)));
  }
}
