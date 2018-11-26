import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectRequiredValidatorDirectives } from './shared/select-required-validator.directive';
import { EmployeeService } from './employees/employee.serive';
import { CreateEmployeeCanDeactivateGaurdService } from './employees/create-employee-can-deactivate-gaurd.service'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { DisplayEmployeeComponent } from './employees/display-employee.component'
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.serve';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGaurdService } from './employees/employee-details-gaurd.service';
import { AccordionComponent } from './shared/accordion.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGaurdService]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGaurdService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirectives,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGaurdService, EmployeeListResolverService, EmployeeDetailsGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
