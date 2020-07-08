import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services2/themes.service';
import { Theme } from '../../models2/theme';
import { Metier } from '../../models2/metiers';
import { QuestionService } from '../../services2/questions.service';
import { AnswersService } from '../../services2/answers.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IQuestion, TypeQst } from '../../models2/question';
import { IAnswer } from '../../models2/answer';
import { MetierService } from '../../services2/metiers.service';
import { delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {faTrash, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {IEditions} from "../../models2/Editions";
import {EditionsService} from "../../services2/EditionsService";

@Component({
  selector: 'app-updateqst',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.components.scss'],
})
export class EditQuestionComponent implements OnInit {
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  qstForm: FormGroup;
  modalForm: FormGroup;
  repForm: FormArray;
  GlobalForm: FormGroup;
  enonce: FormControl;
  theme: FormControl;
  metier: FormControl;
  modalenonce: FormControl;
  modalcheck: FormControl;
  themes: Theme[];
  metiers: Metier[];
  themeLoading = false;
  metierLoading = false;
  isLoading = false;
  public mainquestion: IQuestion;
  public id: string;
  public currTheme: Metier;
  public modalAns: IAnswer;
  private edition: FormControl;
  public EditionModel: IEditions[];
  public selectedEdition: any = [];
  constructor(private themeService: ThemeService,
    private metierService: MetierService,
    private quetionService: QuestionService,
    private flashService: FlashMessagesService,
    private router: Router,
    private editionsService: EditionsService,
    private activeRoute: ActivatedRoute,
    private answerService: AnswersService) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.modalenonce = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    this.modalcheck = new FormControl(null, [
      Validators.required,
    ]);
    this.edition = new FormControl('', [
    ]);
    this.modalForm = new FormGroup({
      modalenonce: this.modalenonce
    });
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
    this.qstForm = new FormGroup({
      enonce: this.enonce,
      theme: this.theme,
      metier: this.metier,
      edition: this.edition
    });
    this.GlobalForm = new FormGroup({
      question: this.qstForm,
      reponses: this.repForm,
    });
    this.quetionService.getQuestionById(this.id).subscribe(s => {
      console.log(s.data);
      this.editionsService.getEditions().subscribe(s1 => {
        this.EditionModel = s1.data;
        // @ts-ignore
        this.selectedEdition = (s.data.editions as IEditions[]).map(el => {
          el['display'] = el.name;
          el['value'] = el.id;
          return el;
        });
      });
      // @ts-ignore
      this.mainquestion = s.data;
      this.enonce.setValue(this.mainquestion.text);
      this.metierService.getMetiers().subscribe(s1 => {
        this.themeService.getThemes().subscribe(s2 => {
          this.themes = s2.data;
          this.currTheme = s1.data.find(el => el.id === this.mainquestion.metierId);
          this.metier.setValue(this.mainquestion.metierId);
          if (this.currTheme) {
            this.theme.setValue(this.currTheme.themeId);
            this.metiers = s1.data.filter(el => el.themeId === this.currTheme.themeId);
          }
        });
      });
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
  validModalChamp(controlName) {
    const ff = this.modalForm;
    return ff.get(controlName).valid || (!ff.get(controlName).touched && !ff.get(controlName).dirty);
  }

  submitform() {
    console.log(this.GlobalForm);
    let editionselids;
    if (this.qstForm.controls.edition.value && this.qstForm.controls.edition.value.length > 0) {
      const editionsel: IEditions[] = this.qstForm.controls.edition.value || [];
      editionselids = editionsel.map(el => el.id);
      console.log(editionselids);
    }
    if (this.GlobalForm.valid) {
      const question: IQuestion = {
        text: this.qstForm.controls.enonce.value,
        metierId: this.qstForm.controls.metier.value,
        code: this.mainquestion.code,
        editions: editionselids || [],
        type: this.mainquestion.type
      };
      const answers = [];
      for (let i = 0; i < this.FormArray.length; i++) {
        const ans: IAnswer = {
          text: this.FormArray.at(i).get('repenonce').value,
          correct: this.FormArray.at(i).get('repcorrect').value,
          questionId: this.mainquestion.id,
        };
        answers.push(ans);
      }
      console.log(question);
      this.isLoading = true;
      this.quetionService.updateQuestionById(question, this.mainquestion.id).subscribe(s => {
        this.answerService.postBulkAnswers(answers).subscribe(s => {
          this.isLoading = false;
          this.FormArray.reset();
          this.FormArray.clear();
          this.mainquestion.answers = [
            ...this.mainquestion.answers,
            ...s.data
          ];
          this.router.navigate(['/questions']);
        }, error1 => {
          this.isLoading = false;
          this.flashService.show(error1.error.error, {
            cssClass: "alert-danger",
            timeout: 3000
          });


        });
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
      this.themeService.getTheme(this.questionForm.controls.theme.value).subscribe(theme => {
        param.set('theme_nom', theme.data.name);
      })
      this.metierLoading = true;
      this.metierService.getMetiers(param).subscribe(s => {
        this.metiers = s.data;
        this.metier.setValue('');
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

  deleteanswer(id: string) {
    const corans = this.mainquestion.answers.filter(el => el.correct);
    const delans = this.mainquestion.answers.find(el => el.id === id);
    if (delans && delans.correct && corans.length <= 1) {
      window.alert('la question doit avoir au minimum une réponse correcte');
      return;
    }
    if (window.confirm('vous étes sur ?')) {
      this.answerService.deleteAnswerById(id).subscribe(s => {
        // this.mainquestion.answers.de
        this.mainquestion.answers = this.mainquestion.answers.filter(el => el.id !== id);
      }, error1 => {
        this.flashService.show(error1.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        });
      });
    }
  }
  updateModalAns() {
    if (this.modalForm.valid) {
      const body: IAnswer = {
        text: this.modalenonce.value,
        correct: this.modalcheck.value
      };
      this.isLoading = true;
      this.answerService.updateAnswerById(body, this.modalAns.id).subscribe(s => {
        this.isLoading = false;
        const edans = this.mainquestion.answers.find(el => el.id === this.modalAns.id);
        if (edans) {
          edans.text = this.modalenonce.value;
          edans.correct = !!this.modalcheck.value;
        }
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
      }, error1 => {
        this.isLoading = false;

        this.flashService.show(error1.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        });
      });
    } else {
      this.modalForm.markAllAsTouched();
    }
  }

  openModal(ans: IAnswer) {
    this.modalAns = ans;
    this.modalForm.reset();
    this.modalenonce.setValue(ans.text);
    this.modalcheck.setValue(ans.correct);
    const modal = document.querySelector('.modal');
    const container = modal.querySelector('.container');
    modal.classList.remove('hidden');

    document.querySelector('.modal').addEventListener('click', function (e) {
      if (e.target !== modal && e.target !== container) { return; }
      modal.classList.add('hidden');
    });
  }
}
