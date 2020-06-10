// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-case-detail',
//   templateUrl: './case-detail.component.html',
//   styleUrls: ['./case-detail.component.css']
// })
// export class CaseDetailComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { StudyCaseService } from "../../services/study-case.service";
import { ThemeService } from "../../services/themes.service";
import { MetierService } from "../../services/metiers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { prod } from "../../prod/prod";
import { QuestionService } from 'src/app/services/questions.service';
@Component({
  selector: 'app-detail-question',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  case: any;
  id;
  metier: string;
  src: string;
  theme: string;
  constructor(private studyCaseService: StudyCaseService, private questionService: QuestionService, private metierService: MetierService, private themeService: ThemeService, private router: Router, private prod: prod,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.studyCaseService.getCase(this.id).subscribe(case2 => {
      this.case = case2.data;
      this.src = `${this.prod.link2}/uploads/` + this.case?.image;
      this.metierService.getMetier(case2.data.metierId).subscribe(metier => {
        this.themeService.getTheme(metier.data.themeId).subscribe(theme => {
          this.theme = theme.data.name;
        })
        this.metier = metier.data.name;
      })
    })
  }

}
