import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { EmployeeService } from "./employee.serive";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class EmployeeDetailsGaurdService implements CanActivate {
    constructor(private _employeeService: EmployeeService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployee(+route.paramMap.get('id'))
            .pipe(map(employee => { const employeeExist = !!employee         
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
        )
    }
}