import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeDetailsGaurdService implements CanActivate {
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = Number(route.paramMap.get('id'));

    return this._employeeService.getEmployee(id).pipe(
      map((employee) => {
        const employeeExist = !!employee;
        if (employeeExist) {
          return true;
        } else {
          this._router.navigate(['notfound']);
          return false;
        }
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
