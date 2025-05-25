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
import { PrivacyNoticeComponent } from './pages/privacy-notice/privacy-notice.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { AuthGuard } from './guards/auth.guard'; // Importa tu guard
import { AdminGuard } from './guards/admin.guard'; // Si tienes un guard de admin


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
        title: "Admin panel",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Editar las lecciones ok
        path: "admin-lessons/:idCourse",
        component: AdminLessonsComponent,
        title: "Admin lessons",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Nuevo curso ok
        path: "admin-courses",
        component: AdminCourseComponent,
        title: "Courses Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Agrega las lecciones de un curso ok
        path: "admin-courses/lesson/:idCourse",
        component: AdminLessonComponent,
        title: "Lessons Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Agrega y edita las lecciones de un curso ok
        path: "admin-courses/lesson/:idCourse/:idLesson",
        component: AdminLessonComponent,
        title: "Lessons Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Crea una practica especifica
        path: "admin-courses/:idCourse/:idLesson/P",
        component: AdminPracticeComponent,
        title: "Practice Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Crea una teoria especifica
        path: "admin-courses/:idCourse/:idLesson/T",
        component: AdminTheoryComponent,
        title: "Theory Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Edita una practica especifica
        path: "admin-courses/:idCourse/:idLesson/P/:idPractice/edit",
        component: AdminPracticeComponent,
        title: "Practice Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        //Edita una teoria especifica
        path: "admin-courses/:idCourse/:idLesson/T/:idTheory/edit",
        component: AdminTheoryComponent,
        title: "Theory Editor",
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: "courses",
        component: CoursesComponent,
        title: "Courses",
        canActivate: [AuthGuard]
      },
      {
        path: "courses-info/:idCourse",
        component: CourseInfoComponent,
        title: "Course Information",
        canActivate: [AuthGuard]
      },
      {
        //Dentro del curso
        path: "course/:idCourse/lessons",
        component: LessonsComponent,
        title: "Lessons",
        canActivate: [AuthGuard]
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
        title: "Practice",
        canActivate: [AuthGuard]
      },
      {
        path: "course/:idCourse/lesson/:idLesson/T/:idTheory",
        component: TheoryComponent,
        title: "Theory",
        canActivate: [AuthGuard]
      },
      {
        path: "privacy-notice",
        component: PrivacyNoticeComponent,
        title: "Theory"
      },
      {
        path: "terms-conditions",
        component: TermsConditionsComponent,
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
