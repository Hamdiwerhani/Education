import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup
  course: any = {};


  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
  }
  addCourse() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Teacher not logged in");
      return;
    }

    const decodedObj: any = jwtDecode(token);
    console.log(decodedObj)

    const courseData = {
      ...this.course,
      teacherId: decodedObj._id // assign the teacherId field
    };

    this.courseService.addCourse(courseData).subscribe((response) => {
      console.log(response);
      if (response.status === "OK") {
        this.router.navigate(['/courses']);
      } else {
        alert("Error: " + response.status);
      }
    });
  }
}
