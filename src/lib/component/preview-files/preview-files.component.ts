import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  imgURL: any;
}

@Component({
  selector: 'lib-preview-files',
  templateUrl: './preview-files.component.html',
  styleUrls: ['./preview-files.component.css']
})
export class PreviewFilesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PreviewFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
  }

}
