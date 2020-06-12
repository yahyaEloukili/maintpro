import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services2/themes.service';
import { Theme } from '../../models2/theme';
import { Metier } from '../../models2/metiers';
import { QuestionService } from '../../services2/questions.service';
import { IQuestion, TypeQst } from '../../models2/question';
import { IAnswer } from '../../models2/answer';
import { FlashMessagesService } from "angular2-flash-messages";
import { MetierService } from '../../services2/metiers.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
declare const $;

@Component({
  selector: 'app-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  faTrash = faTrash;
  qstForm: FormGroup;
  repForm: FormArray;
  GlobalForm: FormGroup;
  enonce: FormControl;
  theme: FormControl;
  metier: FormControl;
  themes: Theme[];
  metiers: Metier[];
  themeLoading = false;
  metierLoading = false;
  isLoading = false;
  constructor(private themeService: ThemeService,
    private metierService: MetierService,
    private flashService: FlashMessagesService,
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
    this.repForm = new FormArray([]);
    this.reponseFormFactory();
    this.qstForm = new FormGroup({
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
    $('.card.mt-2.mx-auto.p-4.bg-light').height(+($('fieldset').height())  + 450 );
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
    $('.card.mt-2.mx-auto.p-4.bg-light').height(+($('fieldset').height())  + 450 );
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
      const question: IQuestion = {
        text: this.qstForm.controls.enonce.value,
        metierId: this.qstForm.controls.metier.value,
        type: TypeQst.SIMPLE,
        answers: []
      };
      for (let i = 0; i < this.FormArray.length; i++) {
        const ans: IAnswer = {
          text: this.FormArray.at(i).get('repenonce').value,
          correct: this.FormArray.at(i).get('repcorrect').value
        };
        question.answers.push(ans);
      }
      console.log(question);
      if (question.answers.filter(el => el.correct).length < 1) {
        window.alert('la question doit avoir au minimum une réponse correcte');
        return;
      }
      this.isLoading = true;
      this.quetionService.postQuestion(question).subscribe(s => {
        this.isLoading = false;
        this.GlobalForm.reset();
        this.FormArray.clear();
      }, error1 => {
      this.isLoading = false;
        this.flashService.show(error1.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        });
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
    $('.card.mt-2.mx-auto.p-4.bg-light').height(+($('fieldset').height())  + 450 );
  }
}
