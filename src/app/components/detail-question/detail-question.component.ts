import { Component, OnInit } from '@angular/core';
import { QuestionService } from "../../services/questions.service";
import { ThemeService } from "../../services/themes.service";
import { MetierService } from "../../services/metiers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { prod } from "../../prod/prod";
@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.css']
})
export class DetailQuestionComponent implements OnInit {
  question: any;
  id;
  metier: string;
  src: string;
  theme: string;
  constructor(private questionService: QuestionService, private metierService: MetierService, private themeService: ThemeService, private router: Router, private prod: prod,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.questionService.getQuestion(this.id).subscribe(question => {
      this.question = question.data;
      this.src = `${this.prod.link2}/uploads/` + this.question?.image;
      this.metierService.getMetier(question.data.metierId).subscribe(metier => {
        this.themeService.getTheme(metier.data.themeId).subscribe(theme => {
          this.theme = theme.data.name;
        })
        this.metier = metier.data.name;
      })


    })

  }

}
