import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { StudentDashModel } from './studentdash.model';
import { ApiService } from '../shared/api.service';
import { Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  showAdd ! :boolean
  showUpdate ! :boolean
  formValue !: FormGroup;
  studentModelObj : StudentDashModel = new StudentDashModel();
  
  studentAll:any;
  selectedStudent: any = null;
  selectedStudentForDelete: any = null;

  constructor(private formBuilder :FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
  this.formValue = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    fees: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  this.getAllStudent();
}

  showToast(message: string, type: 'success' | 'error' = 'success') {
  const toastEl = document.getElementById('liveToast');
  const toastMsg = document.getElementById('toastMessage');

  if (toastEl && toastMsg) {
    toastMsg.innerText = message;

    toastEl.classList.remove('bg-success', 'bg-danger');
    toastEl.classList.add(type === 'success' ? 'bg-success' : 'bg-danger');

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

clickAddStudent(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}

postStudentDetails() {
  if (this.formValue.invalid) {
    this.showToast("Please fill in all required fields correctly!", 'error');
    this.formValue.markAllAsTouched(); 
    return;
  }

  delete this.studentModelObj.id;
  this.studentModelObj.firstName = this.formValue.value.firstName;
  this.studentModelObj.lastName = this.formValue.value.lastName;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.mobile = this.formValue.value.mobile;
  this.studentModelObj.fees = this.formValue.value.fees;
  this.studentModelObj.status = 'Active';

  this.api.postStudent(this.studentModelObj).subscribe(
    res => {
      this.showToast("Student Record Added Successfully!", 'success');
      this.formValue.reset();
      this.getAllStudent();
    },
    err => {
      this.showToast("Something Went Wrong!", 'error');
    }
  );
}

getAllStudent() {
  this.api.getStudent().subscribe(res => {
    console.log('API Response:', res); 
    this.studentAll = res.filter((s: any) =>
      s.firstName && s.email && s.mobile
    );
  }, err => {
    console.error('Error fetching data:', err); 
  });
}

deleteStudents(data: any) {
  const updatedData = { ...data, status: 'Deactive' }; 
  this.api.updateStudent(updatedData, data.id).subscribe(res => {
    this.showToast("Student Deactivated Successfully!", 'success');
    this.getAllStudent();
  });
}

openDeleteConfirm(data: any): void {
  this.selectedStudent = data;
  const modalElement = document.getElementById('deleteConfirmModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

confirmDelete(): void {
  if (this.selectedStudent) {
    this.deleteStudents(this.selectedStudent);
    this.selectedStudent = null;
  }
}

activateStudent(data: any) {
  const updatedData = { ...data, status: 'Active' };
  this.api.updateStudent(updatedData, data.id).subscribe(res => {
    this.showToast("Student Activated Successfully!", 'success');
    this.getAllStudent();
  }, err => {
    this.showToast("Failed to activate student", 'error');
  });
}

onEdit(data:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.studentModelObj.id=data.id;
  this.formValue.controls['firstName'].setValue(data.firstName);
  this.formValue.controls['lastName'].setValue(data.lastName);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['fees'].setValue(data.fees);
}

updateStudentDetails(){
  this.studentModelObj.firstName = this.formValue.value.firstName;
  this.studentModelObj.lastName = this.formValue.value.lastName;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.mobile = this.formValue.value.mobile;
  this.studentModelObj.fees = this.formValue.value.fees;
  this.api.updateStudent(this.studentModelObj, this.studentModelObj.id!).subscribe(res => {
    this.showToast("Student Record Updated Successfully!", 'success');;
    this.formValue.reset();
    this.getAllStudent();
  })
}
}
