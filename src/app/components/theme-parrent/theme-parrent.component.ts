// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-theme-parrent',
//   templateUrl: './theme-parrent.component.html',
//   styleUrls: ['./theme-parrent.component.css']
// })
// export class ThemeParrentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from "../../services/themes.service";

@Component({
  selector: 'app-customized-cell',
  templateUrl: './theme-parrent.component.html',
  styleUrls: ['./theme-parrent.component.css']
})
export class ThemeParrentComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  theme;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.themeService.getTheme(this.cellValue).subscribe(theme => {
      this.theme = theme.data.name;

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.themeService.getTheme(this.cellValue).subscribe(theme => {
      this.theme = theme.data.name;

    })

    return true;
  }



}
