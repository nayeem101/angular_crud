import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';

@Injectable()
export class CreateEmpCanDactivateService
  implements CanDeactivate<CreateEmployeeComponent>
{
  canDeactivate(component: CreateEmployeeComponent): boolean {
    if (
      component.createEmployeeForm.dirty /* &&
      !component.createEmployeeForm.submitted */
    ) {
      return confirm('Are you sure to discard your changes?');
    }
    return true;
  }
}
