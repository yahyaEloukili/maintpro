import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from 'src/app/services/themes.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../services/excel.service';
import { ThemeActionComponent } from '../theme-action/theme-action.component';

import { UserOptions } from 'jspdf-autotable';

import { Router } from '@angular/router';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  themes: Theme[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(private themeService: ThemeService,
    private excelService: ExcelService,
    private flashMessage: FlashMessagesService,
    private router: Router, ) { }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.themeService.getThemes().subscribe(themes => {

      params.api.setRowData(themes.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  exportAsXLSX() {
    this.themeService.getThemes().subscribe(themes => {
      this.excelService.exportAsExcelFile(themes.data, 'themes');
    })
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['name', 'delay'],
      fileName: 'Categories',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['Id', 'Nom']],
      body: this.vars
    });
    doc.save("table.pdf");
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      id: ThemeActionComponent,

    }
    this.themeService.getThemes().subscribe(themes => {


      this.vars = themes.data.map(el => Object.values((el)));


    });
    this.columnDefs = [
      { headerName: 'nom', field: "name", sortable: true, filter: true, checkboxSelection: true, width: "380" },
      { headerName: 'Actions', field: "id", width: "120", cellRenderer: "id" }


    ];
  }
  onDeleteClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces categories?')) {
        selectedData.forEach(element => {
          this.themeService.deleteTheme(element.id).subscribe(() => {
            this.themeService.getThemes().subscribe(themes => {
              this.agGrid.api.setRowData(themes.data);
            })
          });

        });

      }
    }
    else {
      alert('Merci de choisir les themes à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addTheme`]);
  }

}
