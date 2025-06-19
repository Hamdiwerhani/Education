import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "courses", component: CoursesComponent },
  { path: "teachers", component: TeachersComponent },
  { path: "signUpAdmin", component: SignUpComponent },
  { path: "signUpTeacher", component: SignUpComponent },
  { path: "signUpStudent", component: SignUpComponent },
  { path: "signUpParent", component: SignUpComponent },
  { path: "addCourse", component: AddCourseComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
