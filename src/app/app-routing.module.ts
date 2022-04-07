import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpCanDactivateService } from './employees/create-emp-can-dactiv-guard.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsGaurdService } from './employees/employee-details-gaurd.service';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { PageNotFoundComponent } from './employees/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: {
      employeeList: EmployeeListResolverService,
    },
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmpCanDactivateService],
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGaurdService],
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //, { enableTracing: true } for debugging
  exports: [RouterModule],
})
export class AppRoutingModule {}
