import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DisplayCourseComponent } from './components/display-course/display-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCourseComponent,
    DisplayCourseComponent,
    EditCourseComponent,
    CoursesTableComponent,
    UsersTableComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TeachersComponent,
    CoursesComponent,
    BannerHomeComponent,
    BannerComponent,
    AboutComponent,
    SubjectsComponent,
    SignUpComponent,
    CourseComponent,
    TeacherComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    DashboardHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
