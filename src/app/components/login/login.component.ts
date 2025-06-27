import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  user: any = {}
  errorMsg!: string
  constructor(private router: Router, private auth: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.loginUser(this.user).subscribe((response) => {
      if (response.status == "OK") {
        const token = response.user;
        const decodedObj: any = jwtDecode(token);

        console.log("Decoded token:", decodedObj); // 🧪 Debug

        // Block unvalidated teacher
        if (decodedObj.role === "teacher" && decodedObj.success === false) {
          Swal.fire({
            title: "Access Denied",
            text: "Your account is not yet validated by the admin.",
            icon: "warning"
          });
          return;
        }

        sessionStorage.setItem("token", token);

        // 🚀 Route by role
        switch (decodedObj.role) {
          case "student":
          case "parent":
            this.router.navigate([""]);
            break;
          case "teacher":
            this.router.navigate(["/teacherDashboard"]);
            break;
          case "admin":
            this.router.navigate(["/dashboardAdmin"]);
            break;
          default:
            Swal.fire({
              title: "Login Error",
              text: "Unrecognized user role.",
              icon: "error"
            });
            return;
        }

        // 🎉 Show success
        Swal.fire({
          title: this.capitalize(decodedObj.role) + " Login",
          text: "Login Successfully!",
          icon: "success"
        }).then(() => location.reload());
      } else {
        this.errorMsg = response.status;
      }
    });
  }

  // Utility to capitalize role
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


}
