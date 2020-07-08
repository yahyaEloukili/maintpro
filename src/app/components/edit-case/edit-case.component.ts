import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../../models2/theme';
import { Metier } from '../../models2/metiers';
import { IQuestion, TypeQst } from '../../models2/question';
import { IAnswer } from '../../models2/answer';
import { ThemeService } from '../../services2/themes.service';
import { MetierService } from '../../services2/metiers.service';
import { QuestionService } from '../../services2/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswersService } from '../../services2/answers.service';
import { StudyCaseService } from '../../services2/study-case.service';
import { IStudyCase } from '../../models2/studyCase';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {IEditions} from "../../models2/Editions";
import {EditionsService} from "../../services2/EditionsService";

@Component({
  selector: 'app-updatestdcase',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss'],
})
export class EditCaseComponent implements OnInit {
  faTrash = faTrash;

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
  public mainquestion: IStudyCase;
  public id: string;
  public currTheme: Metier;
  public modalAns: IQuestion;
  public title: FormControl;
  private edition: FormControl;
  public EditionModel: IEditions[] = [];
  public selectedEdition: any;
  constructor(private themeService: ThemeService,
    private metierService: MetierService,
    private quetionService: QuestionService,
    private studycaseService: StudyCaseService,
    private editionsService: EditionsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private answerService: AnswersService) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.modalenonce = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
    this.modalcheck = new FormControl(null, [
      Validators.required,
    ]);
    this.modalForm = new FormGroup({
      modalenonce: this.modalenonce
    });
    this.theme = new FormControl('', [
      Validators.required,
    ]);
    this.edition = new FormControl('', [
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
      title: this.title,
      theme: this.theme,
      metier: this.metier,
      edition: this.edition
    });
    this.GlobalForm = new FormGroup({
      question: this.qstForm,
      reponses: this.repForm,
    });
    this.studycaseService.getStudyCaseById(this.id).subscribe(s => {
      console.log(s.data);
      // @ts-ignore
      this.mainquestion = s.data;
      this.enonce.setValue(this.mainquestion.Problematic);
      this.title.setValue(this.mainquestion.title);
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
      this.editionsService.getEditions().subscribe(s3 => {
        // @ts-ignore
        this.selectedEdition = (s.data.editions as IEditions[]).map(el => {
          el['display'] = el.name;
          el['value'] = el.id;
          return el;
        });
        this.EditionModel = s3.data;
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
      const question: IStudyCase = {
        title: this.title.value,
        Problematic: this.qstForm.controls.enonce.value,
        metierId: this.qstForm.controls.metier.value,
        editions: editionselids || [],
        code: this.mainquestion.code,
      };
      const questions = [];
      for (let i = 0; i < this.FormArray.length; i++) {
        const qst: IQuestion = {
          text: this.FormArray.at(i).get('repenonce').value,
          studyCaseId: this.mainquestion.id,
          metierId: this.qstForm.controls.metier.value,
          type: TypeQst.CASE,
        };
        questions.push(qst);
      }
      console.log(question);
      this.isLoading = true;
      this.studycaseService.updateStudyCaseById(question, this.mainquestion.id).subscribe(s => {
        this.quetionService.postBulkQuestions(questions).subscribe(s => {
          this.isLoading = false;
          this.FormArray.reset();
          this.FormArray.clear();
          this.mainquestion.questions = [
            ...this.mainquestion.questions,
            ...questions
          ];
          this.router.navigate(['/studyCases']);
        }, error1 => {
          this.isLoading = false;
        });
      }, error1 => { this.isLoading = false; });
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
        this.metier.setValue('');
        this.metierLoading = false;
      }, error1 => {
        this.metierLoading = false;
      });
    }
  }

  clearArrayForm() {
    this.FormArray.clear();
  }

  deleteanswer(id: string) {
    if (window.confirm('vous étes sur ?')) {
      this.quetionService.deleteQuestionById(id).subscribe(s => {
        // this.mainquestion.answers.de
        this.mainquestion.questions = this.mainquestion.questions.filter(el => el.id !== id);
      }, error1 => {
      });
    }
  }
  updateModalAns() {
    if (this.modalForm.valid) {
      // @ts-ignore
      const body: IQuestion = {
        text: this.modalenonce.value,
      };
      console.log('====>', body);
      this.isLoading = true;
      this.quetionService.updateQuestionById(body, this.modalAns.id).subscribe(s => {
        this.isLoading = false;
        const edans = this.mainquestion.questions.find(el => el.id === this.modalAns.id);
        if (edans) {
          edans.text = this.modalenonce.value;
        }
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
      }, error1 => { this.isLoading = false; });
    } else {
      this.modalForm.markAllAsTouched();
    }
  }

  openModal(ans: IQuestion) {
    this.modalAns = ans;
    this.modalForm.reset();
    this.modalenonce.setValue(ans.text);
    const modal = document.querySelector('.modal');
    const container = modal.querySelector('.container');
    modal.classList.remove('hidden');

    document.querySelector('.modal').addEventListener('click', function (e) {
      if (e.target !== modal && e.target !== container) { return; }
      modal.classList.add('hidden');
    });
  }

  openEditPage($event, id: string) {
    window.open(`/editQuestion/${id}`);
  }
}
