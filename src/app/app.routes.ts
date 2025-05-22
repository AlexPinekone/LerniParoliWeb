import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminCourseComponent } from './pages/admin-course/admin-course.component';
import { AdminLessonComponent } from './pages/admin-lesson/admin-lesson.component';
import { AdminPracticeComponent } from './pages/admin-practice/admin-practice.component';
import { AdminTheoryComponent } from './pages/admin-theory/admin-theory.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PracticeComponent } from './pages/practice/practice.component';
import { TheoryComponent } from './pages/theory/theory.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        title: "Home"
      },
      {
        //Todos los cursos para editar
        path: "admin-courses",
        component: AdminCourseComponent,
        title: "Courses Editor"
      },
      {
        //Edita las lecciones de un curso
        path: "admin-panel/:idCourse",
        component: AdminLessonComponent,
        title: "Lessons Editor"
      },
      {
        //Edita una practica especifica
        path: "admin-panel/:idCourse/:idLesson/P/:idPractice",
        component: AdminPracticeComponent,
        title: "Practice Editor"
      },
      {
        path: "admin-panel/:idCourse/:idLesson/T/:idTheory",
        component: AdminTheoryComponent,
        title: "Theory Editor"
      },
      {
        path: "courses",
        component: CoursesComponent,
        title: "Courses"
      },
      {
        path: "courses-info/:idCourse",
        component: CourseInfoComponent,
        title: "Course Information"
      },
      {
        //Dentro del curso
        path: "course/:idCourse/lessons",
        component: LessonsComponent,
        title: "Lessons"
      },
      {
        path: "login",
        component: LoginComponent,
        title: "Login"
      },
      {
        path: "register",
        component: RegisterComponent,
        title: "Register"
      },
      {
        path: "course/:idCourse/lessons/P/:idPractice",
        component: PracticeComponent,
        title: "Practice"
      },
      {
        path: "course/:idCourse/lessons/T/:idTheory",
        component: TheoryComponent,
        title: "Theory"
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "not-found",
        component: NotfoundComponent,
        title: "Not found"
      },
      {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
      }

];
