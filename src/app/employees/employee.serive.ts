import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, pipe, of } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from "rxjs";

@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) {}
    baseUrl = "http://localhost:3000/employees";

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));

        // return of(this.listEmployees).pipe(delay(200));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error : ', errorResponse.error.message);
        }
        else {
            console.error('Server Side Error : ', errorResponse)
        }

        return throwError("There is problem with the service.");
    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError))
    }

    udpateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number) : Observable<void>{
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
                    .pipe(catchError(this.handleError));
    }

    // save(employee: Employee) {
    //     if (employee.id === null) {
    //         const maxId = this.listEmployees.reduce(function (e1, e2) {
    //             return (e1.id > e2.id) ? e1 : e2;
    //         }).id;
    //         employee.id = maxId + 1;
    //         this.listEmployees.push(employee);
    //     }
    //     else {
    //         const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
    //         this.listEmployees[foundIndex] = employee;
    //     }
    // }

}