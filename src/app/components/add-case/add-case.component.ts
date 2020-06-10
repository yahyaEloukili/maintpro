import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../../models2/theme';
import { Metier } from '../../models2/metiers';
import { ThemeService } from '../../services2/themes.service';
import { MetierService } from '../../services2/metiers.service';
import { QuestionService } from '../../services2/questions.service';
import { IQuestion, TypeQst } from '../../models2/question';
import { IStudyCase } from '../../models2/studyCase';
import { FlashMessagesService } from "angular2-flash-messages";
import { StudyCaseService } from '../../services2/study-case.service';

@Component({
  selector: 'app-addstdcase',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss'],
})
export class AddCaseComponent implements OnInit {
  qstForm: FormGroup;
  repForm: FormArray;
  GlobalForm: FormGroup;
  title: FormControl;
  enonce: FormControl;
  theme: FormControl;
  metier: FormControl;
  themes: Theme[];
  metiers: Metier[];
  themeLoading = false;
  metierLoading = false;
  isLoading = false;
  constructor(private themeService: ThemeService,
    private flashService: FlashMessagesService,
    private metierService: MetierService,
    private studyCaseService: StudyCaseService,
    private quetionService: QuestionService) { }

  ngOnInit() {
    this.theme = new FormControl('', [
      Validators.required,
    ]);
    this.metier = new FormControl('', [
      Validators.required,
    ]);
    this.enonce = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    this.repForm = new FormArray([]);
    this.reponseFormFactory();
    this.qstForm = new FormGroup({
      title: this.title,
      enonce: this.enonce,
      theme: this.theme,
      metier: this.metier
    });
    this.GlobalForm = new FormGroup({
      question: this.qstForm,
      reponses: this.repForm,
    });
    this.themeLoading = true;
    this.themeService.getThemes().subscribe(s => {
      console.log(s.data);
      this.themes = s.data;
      this.themeLoading = false;
    }, error1 => {
      this.flashService.show(error1.error.error, {
        cssClass: "alert-danger",
        timeout: 3000
      });
      this.themeLoading = false;
    });
  }
  get FormArray() {
    return this.GlobalForm.get('reponses') as FormArray;
  }
  removeSouEqForm(i: number) {
    this.repForm.removeAt(i);
  }
  get questionForm() {
    return this.GlobalForm.get('question') as FormGroup;
  }
  reponseFormFactory() {
    const repenonce = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    const repcorrect = new FormControl(false, [
      Validators.required,
    ]);
    const form = new FormGroup({
      repenonce, repcorrect
    });
    this.repForm.push(form);
  }
  validArrayChamp(controlName, index) {
    const ff = (this.GlobalForm.get('reponses') as FormArray);
    return ff.at(index).get(controlName).valid || (!ff.at(index).get(controlName).touched && !ff.at(index).get(controlName).dirty);
  }
  validChamp(controlName) {
    const ff = (this.GlobalForm.get('question') as FormGroup);
    return ff.get(controlName).valid || (!ff.get(controlName).touched && !ff.get(controlName).dirty);
  }

  submitform() {
    console.log(this.GlobalForm);
    if (this.GlobalForm.valid) {
      const studyCase: IStudyCase = {
        title: this.qstForm.controls.title.value,
        Problematic: this.qstForm.controls.enonce.value,
        metierId: this.qstForm.controls.metier.value,
        questions: []
      };
      for (let i = 0; i < this.FormArray.length; i++) {
        const qst: IQuestion = {
          text: this.FormArray.at(i).get('repenonce').value,
          metierId: this.qstForm.controls.metier.value,
          type: TypeQst.CASE
        };
        studyCase.questions.push(qst);
      }
      console.log(studyCase);
      this.isLoading = true;
      this.studyCaseService.postStudyCase(studyCase).subscribe(s => {
        this.isLoading = false;
        this.GlobalForm.reset();
        this.FormArray.clear();
      }, error1 => {
        this.flashService.show(error1.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.isLoading = false;
      });
    } else {
      this.GlobalForm.markAllAsTouched();
    }
  }

  themeChange($event: Event) {
    if (this.questionForm.controls.theme.value && this.questionForm.controls.theme.value.length > 0) {
      const param = new URLSearchParams();
      param.set('themeId', this.questionForm.controls.theme.value);
      this.metierLoading = true;
      this.metierService.getMetiers(param).subscribe(s => {
        this.metiers = s.data;
        this.metierLoading = false;
      }, error1 => {
        this.flashService.show(error1.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.metierLoading = false;
      });
    }
  }

  clearArrayForm() {
    this.FormArray.clear();
  }
}
