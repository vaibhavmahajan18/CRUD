import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.serive';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  panelTitle: string;
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;

  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ]

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
    });
  }
  togglePhot0Preview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        department: "select",
        dateOfBirth: null,
        isActive: null,
        photoPath: null
      };
      this.panelTitle = "Create Employee";
      this.createEmployeeForm.reset();
    }
    else {
      this.panelTitle = "Edit Employee";
      this._employeeService.getEmployee(id).subscribe((employee) => this.employee = employee, (error: any) => console.log(error))
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },(error: any) => console.log(error));
    }
    else{
      this._employeeService.udpateEmployee(this.employee).subscribe(
        () => {          
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },(error: any) => console.log(error));
    }
  }
  // saveEmployee(): void {
  //   const newEmployee: Employee = Object.assign({}, this.employee);
  //   this._employeeService.save(newEmployee);
  //   this.createEmployeeForm.reset();
  //   this._router.navigate(['list']);
  // }
}
