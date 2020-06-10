import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { prod } from './prod/prod';
import { RouterModule, ROUTES } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { QuestionsComponent } from './components/questions/questions.component';
import { AuthGuard } from './guards/auth.guard';
import { ThemesComponent } from './components/themes/themes.component';
import { AgGridModule } from 'ag-grid-angular';
import { jsPdf } from "jspdf";
import { ReactiveFormsModule } from '@angular/forms';
import { UserOptions } from "jspdf-autotable";
import { ExcelService } from './services/excel.service';
import { AddThemeComponent } from './components/add-theme/add-theme.component';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { ThemeActionComponent } from './components/theme-action/theme-action.component';
import { MetiersComponent } from './components/metiers/metiers.component';
import { ThemeParrentComponent } from './components/theme-parrent/theme-parrent.component';
import { MetierActionComponent } from './components/metier-action/metier-action.component';
import { AddMetierComponent } from './components/add-metier/add-metier.component';
import { EditMetierComponent } from './components/edit-metier/edit-metier.component';
import { QuestionActionComponent } from './components/question-action/question-action.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { StudyCasesComponent } from './components/study-cases/study-cases.component';
import { CasesActionComponent } from './components/cases-action/cases-action.component';
import { AddCaseComponent } from './components/add-case/add-case.component';
import { EditCaseComponent } from './components/edit-case/edit-case.component';
import { UsersComponent } from './components/users/users.component';
import { UserActionComponent } from './components/user-action/user-action.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CheckcorrectComponent } from './components/add-question/checkcorrect/checkcorrect.component';
import { LoaderComponent } from './components/add-question/loader/loader.component';
import { DetailQuestionComponent } from './components/detail-question/detail-question.component';
import { ThemeQuestionComponent } from './components/theme-question/theme-question.component';
import { ThemeCaseComponent } from './components/theme-case/theme-case.component';
import { CaseDetailComponent } from './components/case-detail/case-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsComponent,
    ThemesComponent,
    AddThemeComponent,
    EditThemeComponent,
    ThemeActionComponent,
    MetiersComponent,
    ThemeParrentComponent,
    MetierActionComponent,
    AddMetierComponent,
    EditMetierComponent,
    QuestionActionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    StudyCasesComponent,
    CasesActionComponent,
    AddCaseComponent,
    EditCaseComponent,
    UsersComponent,
    UserActionComponent,
    AddUserComponent,
    EditUserComponent,
    CheckcorrectComponent,
    LoaderComponent,
    DetailQuestionComponent,
    ThemeQuestionComponent,
    ThemeCaseComponent,
    CaseDetailComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [prod, AuthGuard, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
