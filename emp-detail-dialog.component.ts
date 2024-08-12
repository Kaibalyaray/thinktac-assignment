import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
})
export class EmpDetailDialogComponent {
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  onSave(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.employeeForm.value });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}