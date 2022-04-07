import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/employees';

  private handleError(errResponse: HttpErrorResponse) {
    if (errResponse.error instanceof ErrorEvent) {
      console.error(
        `%cClient side error:  ${errResponse.error.message}`,
        'color:red'
      );
    } else {
      console.error('Server side error', errResponse);
    }

    return throwError(
      () => new Error('Sorry! error occured in service. Please try again later')
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient
      .get<Employee>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    console.table(employee);
    return this.httpClient
      .post<Employee>(this.url, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'Application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    console.table(employee);
    return this.httpClient
      .put<void>(`${this.url}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'Application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
