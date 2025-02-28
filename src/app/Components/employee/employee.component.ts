import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { ServiceService } from '../../Services/service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../capitalize.pipe';
declare var bootstrap: any;
@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, CommonModule, CapitalizePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({})
  employeeList: Employee[] = [];
  empService = inject(ServiceService);
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.SetformState();
    this.getAllEmployees();

  }
  openModal() {
    const empModal = document.getElementById('exampleModal');
    if (empModal) {
      const modal = new bootstrap.Modal(empModal);
      modal.show();
    }

  }
  getAllEmployees() {
    // this.empService.getAllEmployees().subscribe((res) => {
    //   this.employeeList = res;
    // })
    //With Animation Popup Emp Not Found....
    //   this.empService.getAllEmployees().subscribe({
    //     next: (res) => {
    //       this.employeeList = res;
    //       if (!this.employeeList || this.employeeList.length === 0) {
    //         Swal.fire({
    //           title: 'No Records',
    //           text: 'No employee records found.',
    //           icon: 'info',
    //           width: '300px',
    //           background: '#f8d7da',
    //           //timer: 3000,
    //           timerProgressBar: true,
    //           showClass: {
    //             popup: 'animate__animated animate__fadeIn'
    //           },
    //           hideClass: {
    //             popup: 'animate__animated animate__fadeOut'
    //           },
    //         });
    //       }
    //     },
    //     error: (err) => console.error('Get Error:', err)
    //   });

    // }
    // this.empService.getAllEmployees().subscribe({
    //   next: (res) => {
    //     this.employeeList = res;
    //     if (!this.employeeList || this.employeeList.length === 0) {
    //       // 2 seconds delay ke saath "No Records" popup
    //       setTimeout(() => {
    //         Swal.fire({
    //           title: 'No Records',
    //           text: 'No employee records found.',
    //           icon: 'info',
    //           width: '300px',
    //           background: '#f8d7da',
    //           timer: 3000,
    //           timerProgressBar: true,
    //           showClass: {
    //             popup: 'animate__animated animate__fadeIn'
    //           },
    //           hideClass: {
    //             popup: 'animate__animated animate__fadeOut'
    //           }
    //         });
    //       }, 2000); // 2000ms = 2 seconds delay
    //     }
    //   },
    //   error: (err) => console.error('Get Error:', err)
    // });
    this.empService.getAllEmployees().subscribe({
      next: (res) => {
        this.employeeList = res;
        console.log('Updated Employee List:', this.employeeList);
      },
      error: (err) => console.error('Get Error:', err)
    });

  }
  SetformState() {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      moblieNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', [Validators.required, Validators.min(1)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      status: [false]


    });

  }
  formValues: any;
  onSubmit() {
    // debugger;
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      alert('Please Fill All Fields');
      return;
    }

    this.formValues = this.employeeForm.value;

    if (this.formValues.id === 0) { // Add case
      this.formValues.mobileNo = this.formValues.mobileNo.toString();
      this.empService.addEmployee(this.formValues).subscribe({
        next: (res) => {
          alert('Employee Added Successfully');
          this.getAllEmployees();
          this.employeeForm.reset();
          this.closeModel();
        },
        error: (err) => console.error('Add Error:', err)
      });
    } else { // Update case
      //this.formValues.mobileNo = this.formValues.mobileNo.toString();
      this.empService.updateEmployee(this.formValues).subscribe({
        next: (res) => {
          alert('Employee Updated Successfully');
          this.getAllEmployees();
          this.employeeForm.reset();
          this.closeModel();
        },
        error: (err) => console.error('Update Error:', err)
      });
    }
  }
  closeModel() {
    this.SetformState();
    const empModal = document.getElementById('exampleModal');
    if (empModal) {
      const modal = bootstrap.Modal.getInstance(empModal);
      modal.hide();
    }


  }

  // onDelete(id: number) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You want to delete this employee?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!',
  //     customClass: {
  //       title: 'custom-title', // Custom class for title
  //       htmlContainer: 'custom-text'

  //     }

  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.empService.deleteEmployee(id).subscribe({
  //         next: (res) => {
  //           Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
  //           this.getAllEmployees();
  //         },
  //         error: (err) => {
  //           console.error('Delete Error:', err);
  //           Swal.fire('Error', 'Failed to delete employee', 'error');
  //         }
  //       });
  //     }
  //   });
  // }
  // // with Animation SweetAlert.......
  onDelete(employee: Employee) {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You want to delete this employee ' + employee.name,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Yes, delete it!',
    //   customClass: {
    //     popup: 'custom-popup',
    //     title: 'custom-title',
    //     htmlContainer: 'custom-text'
    //   },
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown' // Enter animation
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp' // Exit animation
    //   }
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.empService.deleteEmployee(employee.id).subscribe({
    //       next: (res) => {
    //         Swal.fire({
    //           title: 'Deleted!',
    //           text: employee.name + ' Employee has been deleted.',
    //           icon: 'success',
    //           confirmButtonText: 'OK',
    //           // timer: 1500,
    //           showClass: {
    //             popup: 'animate__animated animate__bounceIn' // Success enter animation
    //           },
    //           hideClass: {
    //             popup: 'animate__animated animate__bounceOut' // Success exit animation
    //           }
    //         }).then((deleteResult) => {
    //           // OK button click ke baad list refresh aur check
    //           if (deleteResult.isConfirmed) {
    //             this.getAllEmployees(); // List refresh karein
    //             // Subscribe ke baad list check karne ke liye setTimeout use karein
    //             setTimeout(() => {
    //               if (!this.employeeList || this.employeeList.length === 0) {
    //                 Swal.fire({
    //                   title: 'No Records',
    //                   text: 'No employee records found.',
    //                   icon: 'info',
    //                   width: '300px',
    //                   background: '#f8d7da',
    //                   timer: 3000,
    //                   timerProgressBar: true,
    //                   showClass: {
    //                     popup: 'animate__animated animate__fadeIn'
    //                   },
    //                   hideClass: {
    //                     popup: 'animate__animated animate__fadeOut'
    //                   }
    //                 });
    //               }
    //             }, 100); // 100ms delay taaki list update ho sake
    //           }
    //         });
    //       },
    //       error: (err) => {
    //         Swal.fire('Error', 'Failed to delete employee', 'error');
    //       }
    //     });
    //   }
    // });
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        title: 'custom-title',
        htmlContainer: 'custom-text'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmployee(employee.id).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Employee has been deleted.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'swal-progress-popup' // Custom class for styling
              },
              showClass: {
                popup: 'animate__animated animate__bounceIn'
              },
              hideClass: {
                popup: 'animate__animated animate__bounceOut'
              }
            }).then((deleteResult) => {
              if (deleteResult.isConfirmed) {
                this.empService.getAllEmployees().subscribe({
                  next: (res) => {
                    this.employeeList = res;
                    if (!this.employeeList || this.employeeList.length === 0) {
                      Swal.fire({
                        title: 'No Records',
                        html: `
                          <div>No employee records found.</div>
                          <div class="no-records-progress"></div>
                        `,
                        icon: 'info',
                        width: '300px',
                        background: '#f8d7da',
                        confirmButtonText: 'OK',
                        showClass: {
                          popup: 'animate__animated animate__fadeIn'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOut'
                        },
                        allowOutsideClick: false,
                        allowEscapeKey: false
                      });
                    }
                  },
                  error: (err) => console.error('Get Error after delete:', err)
                });
              }
            });
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to delete employee', 'error');
          }
        });
      }
    });
  }
  OnEdit(employee: Employee) {

    this.openModal();
    this.employeeForm.patchValue(employee);
  }
}
