import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://localhost:7268/api/Employee'
  constructor() { }

  http = inject(HttpClient)

  getAllEmployees() {
    return this.http.get<Employee[]>(this.apiUrl + '/EmployeeList');
  }
  addEmployee(data: any) {
    // debugger;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // ✅ Proper Header Set
    });
    return this.http.post(this.apiUrl + '/AddEmployee', data, { headers })
  }

  updateEmployee(employee: Employee) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/UpdateEmployee/${employee.id}`, employee, { headers });
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/DeleteEmployee/${id}`);
  }
}
