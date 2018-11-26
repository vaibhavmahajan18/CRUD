import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model'
import { EmployeeService } from './employee.serive';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './Resolved-employeelist.model';


@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  error: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    const resolvedData: Employee[] | string = this.employees = this._route.snapshot.data['employeeList'];
   
    if(Array.isArray(resolvedData)){
      this.employees = resolvedData;
    }
    else{
      this.error = resolvedData;
      
    }

    this.filteredEmployees = this.employees;
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }
  
  onDeletenotification(id: number){
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if(i !== -1){
        this.filteredEmployees.splice(i,1);
    }
  }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe((emplist) => {
    //    this.employees = emplist;
    // // add the below line here due to delay to get the data
    //    this.filteredEmployees = this.employees;
    //   });
  }

  //  onClick(employeeId: number) {
  //    this._router.navigate(['/employees',employeeId])
  //  }

  //  changeEmployeeName(){
  //    this.employees[0].name="Jorden";
  //    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  //   // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
  //   // newEmployeeArray[0].name='Jorden';
  //   // this.employees = newEmployeeArray;
  // }

}
