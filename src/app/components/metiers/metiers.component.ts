import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from 'src/app/services/themes.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../services/excel.service';
import { ThemeParrentComponent } from '../theme-parrent/theme-parrent.component';

import { UserOptions } from 'jspdf-autotable';

import { Router } from '@angular/router';
import { MetierService } from 'src/app/services/metiers.service';
import { ThemeActionComponent } from '../theme-action/theme-action.component';
import { MetierActionComponent } from '../metier-action/metier-action.component';
@Component({
  selector: 'app-metiers',
  templateUrl: './metiers.component.html',
  styleUrls: ['./metiers.component.css']
})
export class MetiersComponent implements OnInit {
  themes: Theme[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(private metierService: MetierService,
    private excelService: ExcelService,
    private flashMessage: FlashMessagesService,
    private router: Router, ) { }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.metierService.getMetiers().subscribe(metiers => {

      params.api.setRowData(metiers.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  exportAsXLSX() {
    this.metierService.getMetiers().subscribe(metiers => {
      this.excelService.exportAsExcelFile(metiers.data, 'metiers');
    })
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['name'],
      fileName: 'Metiers',
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
    doc.save("metiers.pdf");
  }

  ngOnInit(): void {

    this.metierService.getMetiers().subscribe(metiers => {


      this.vars = metiers.data.map(el => Object.values((el)));


    });
    this.columnDefs = [
      { headerName: 'Nom', field: "name", sortable: true, filter: true, checkboxSelection: true, width: "380" },
      { headerName: 'Theme parrent', field: "themeId", sortable: true, filter: true, width: "380", cellRenderer: "themeId" },
      { headerName: 'Actions', field: "id", width: "120", cellRenderer: "id" }


    ];
    this.frameworkComponents = {
      themeId: ThemeParrentComponent,
      id: MetierActionComponent

    }
  }
  onDeleteClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces metiers?')) {
        selectedData.forEach(element => {
          this.metierService.deleteMetier(element.id).subscribe(() => {
            this.metierService.getMetiers().subscribe(metiers => {
              this.agGrid.api.setRowData(metiers.data);
            })
          });

        });

      }
    }
    else {
      alert('Merci de choisir les metiers à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addMetier`]);
  }

}
