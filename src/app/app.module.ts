import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectReqValidator } from './shared/select-req-validator.directive';
import { ConfirmEqlPassValidator } from './shared/confirm-pass-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee/display-employee.component';
import { CreateEmpCanDactivateService } from './employees/create-emp-can-dactiv-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './employees/page-not-found/page-not-found.component';
import { EmployeeDetailsGaurdService } from './employees/employee-details-gaurd.service';
import { AccordionComponent } from './shared/accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectReqValidator,
    ConfirmEqlPassValidator,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    EmployeeService,
    CreateEmpCanDactivateService,
    EmployeeListResolverService,
    EmployeeDetailsGaurdService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
