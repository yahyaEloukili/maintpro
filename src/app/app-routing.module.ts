import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { ThemesComponent } from "./components/themes/themes.component";
import { MetiersComponent } from "./components/metiers/metiers.component";
import { UsersComponent } from "./components/users/users.component";
import { AddThemeComponent } from "./components/add-theme/add-theme.component";
import { AddQuestionComponent } from "./components/add-question/add-question.component";
import { AddCaseComponent } from "./components/add-case/add-case.component";
import { EditQuestionComponent } from "./components/edit-question/edit-question.component";
import { EditCaseComponent } from "./components/edit-case/edit-case.component";
import { AddMetierComponent } from "./components/add-metier/add-metier.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { DetailQuestionComponent } from "./components/detail-question/detail-question.component";
import { AuthGuard } from "./guards/auth.guard";
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { EditMetierComponent } from './components/edit-metier/edit-metier.component';
import { StudyCasesComponent } from './components/study-cases/study-cases.component';
import { CaseDetailComponent } from './components/case-detail/case-detail.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "questions",
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "question/:id",
    component: DetailQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "case/:id",
    component: CaseDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "studyCases",
    component: StudyCasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "themes",
    component: ThemesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "metiers",
    component: MetiersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addTheme",
    component: AddThemeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addUser",
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editUser/:id",
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addMetier",
    component: AddMetierComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addQuestion",
    component: AddQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addCase",
    component: AddCaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editCase/:id",
    component: EditCaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editQuestion/:id",
    component: EditQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editTheme/:id",
    component: EditThemeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editMetier/:id",
    component: EditMetierComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
