import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { EmployeeService } from "./employee.serive";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ResolvedEmployeeList } from "./Resolved-employeelist.model";

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string>{
    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
        .pipe(
            catchError((err:string) => of(err))
        );
    }
}