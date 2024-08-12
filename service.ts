import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firestore: AngularFirestore) {}

  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }

  addEmployee(employee: Employee) {
    return this.firestore.collection('employees').add(employee);
  }

  updateEmployee(id: string, employee: Employee) {
    return this.firestore.collection('employees').doc(id).update(employee);
  }

  deleteEmployee(id: string) {
    return this.firestore.collection('employees').doc(id).delete();
  }
}