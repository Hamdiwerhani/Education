import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { passwordsMatchValidator, strongPasswordValidator } from 'src/app/validators/validatorPass';
import { FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  path!: string
  photoFile!: File;
  cvFile!: File;
  phoneErrorMsg!: string
  emailErrorMsg!: string

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.path = this.router.url
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        address: ['', [Validators.required, Validators.minLength(2)]],
        speciality: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            strongPasswordValidator
          ]
        ],
        confirmPassword: ['', Validators.required],
        telephone: [
          '',
          [Validators.required, Validators.pattern(/^\d{8}$/)
          ]
        ],
        childTelephones: this.formBuilder.array([
          this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{8}$/)])
        ])
      },
      { validators: passwordsMatchValidator() }
    );
    if (this.path !== '/signUpTeacher') {
      this.signUpForm.removeControl('speciality');
    }
    if (this.path !== '/signUpParent') {
      this.signUpForm.removeControl('childTelephones');
    }
  }
  signUp() {
    // Clone the form value so we don't mutate the original
    const userData = { ...this.signUpForm.value };

    // Set the role based on path
    switch (this.path) {
      case '/signUpAdmin':
        userData.role = 'admin';
        userData.success = true; // auto validate
        break;
      case '/signUpTeacher':
        userData.role = 'teacher';
        break;
      case '/signUpStudent':
        userData.role = 'student';
        break;
      case '/signUpParent':
        userData.role = 'parent';
        break;
      default:
        userData.role = 'student';
    }

    // Remove childTelephones if it's not a parent or is empty
    if (userData.role !== 'parent' || !userData.childTelephones?.length) {
      delete userData.childTelephones;
    }
    this.userService.signUp(userData, { photo: this.photoFile, cv: this.cvFile }).subscribe((response) => {
      console.log(response);
      if (response.status == 'USER ALREADY EXISTS') {
        this.emailErrorMsg = response.status;
      } else if (response.status == 'INVALID CHILD TELEPHONE') {
        this.phoneErrorMsg = response.status;
      }

      else {
        this.router.navigate(['/login']);
        Swal.fire({
          title: "Good job!",
          text: "Signup Successfully!",
          icon: "success",
          width: "800px",
        });
      }
    });
  }
  onFileSelected(event: Event, type: 'photo' | 'cv') {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      if (type == 'photo') {
        this.photoFile = input.files[0];
      } else if (type == 'cv') {
        this.cvFile = input.files[0];
      }
    }
  }

  get childTelephones(): FormArray {
    return this.signUpForm.get('childTelephones') as FormArray;
  }

  addChildTelephone(): void {
    this.childTelephones.push(this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{8}$/)]));
  }

  removeChildTelephone(index: number): void {
    this.childTelephones.removeAt(index);
  }
}
