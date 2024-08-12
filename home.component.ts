import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees().pipe(
      map((changes) =>
        changes.map((c) => ({ id: c.payload.doc.id, ...(c.payload.doc.data() as Employee) }))
      )
    );
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      data: employee ? { ...employee } : { name: '', email: '', phone: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (employee) {
          this.employeeService.updateEmployee(employee.id!, result);
        } else {
          this.employeeService.addEmployee(result);
        }
      }
    });
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
  }
}