import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
//Admin dashboard. AdminCourses
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
//Editar cursos AdminCourseEditor
import { AdminCourseComponent } from './pages/admin-course/admin-course.component';
//Editar lecciones AdminLesson
import { AdminLessonComponent } from './pages/admin-lesson/admin-lesson.component';
//Editar práctica AdminPracticeEditor
import { AdminPracticeComponent } from './pages/admin-practice/admin-practice.component';
//Editar teoría AdminTheoryEditor
import { AdminTheoryComponent } from './pages/admin-theory/admin-theory.component';
//Ver todas las lecciones AdminLessons
import { AdminLessonsComponent } from './pages/admin-lessons/admin-lessons.component';
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
        //Todos los cursos ok
        path: "admin-panel",
        component: AdminPanelComponent,
        title: "Admin panel"
      },
      {
        //Editar las lecciones ok
        path: "admin-lessons/:idCourse",
        component: AdminLessonsComponent,
        title: "Admin lessons"
      },
      {
        //Nuevo curso ok
        path: "admin-courses",
        component: AdminCourseComponent,
        title: "Courses Editor"
      },
      {
        //Agrega las lecciones de un curso ok
        path: "admin-courses/lesson/:idCourse",
        component: AdminLessonComponent,
        title: "Lessons Editor"
      },
      {
        //Agrega y edita las lecciones de un curso ok
        path: "admin-courses/lesson/:idCourse/:idLesson",
        component: AdminLessonComponent,
        title: "Lessons Editor"
      },
      {
        //Crea una practica especifica
        path: "admin-courses/:idCourse/:idLesson/P",
        component: AdminPracticeComponent,
        title: "Practice Editor"
      },
      {
        //Crea una teoria especifica
        path: "admin-courses/:idCourse/:idLesson/T",
        component: AdminTheoryComponent,
        title: "Theory Editor"
      },
      {
        //Edita una practica especifica
        path: "admin-courses/:idCourse/:idLesson/P/:idPractice/edit",
        component: AdminPracticeComponent,
        title: "Practice Editor"
      },
      {
        //Edita una teoria especifica
        path: "admin-courses/:idCourse/:idLesson/T/:idTheory/edit",
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
        path: "course/:idCourse/lesson/:idLesson/P/:idPractice",
        component: PracticeComponent,
        title: "Practice"
      },
      {
        path: "course/:idCourse/lesson/:idLesson/T/:idTheory",
        component: TheoryComponent,
        title: "Theory"
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      /*{
        path: "not-found",
        component: NotfoundComponent,
        title: "Not found"
      },
      {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
      }*/

];
