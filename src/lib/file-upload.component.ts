import { Component, OnInit, ViewChild, Input, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploadService } from './file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from './component/alert-message/alert-message.component';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { PreviewFilesComponent } from './component/preview-files/preview-files.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'lib-file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['style.css']
})

export class FileUploadComponent implements OnInit {

  public formData = new FormData();
  public files: any = [];
  public filesProcess: any = [];
  public configData: any;
  public totalFile: number = 0;
  public dialogRef: any;

  @Input()
  set config(getConfig: any) {
    this.configData = getConfig;
  }

  constructor(private formBuilder: FormBuilder, private fileUploadService: FileUploadService,
    private ActivatedRoute: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  /* Select File Proccess */
  selectFiles(event) {
    for (let index = 0; index < event.length; index++) {
      var count: number = this.files.length + index;
      const element = event[index];
      
      /* Checking Validation */
      let validate: any = this.checkingValidation(element);
      if (validate.status) {
        element.valid = { status: true };
        element.upload = { status: 'selected' };
        element.viewUrl = 'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif';
        this.files.push(element);
        this.viewTh(count);
      } else {
        element.valid = { status: false, message: validate.message };
        element.upload = { status: 'selected' };
        element.viewUrl = 'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif';
        this.files.push(element);
        this.viewTh(count);
      }
    }
  }

  viewTh(count) {
    setTimeout(() => {
      var reader = new FileReader();
      let imagePath = this.files[count];
      reader.readAsDataURL(this.files[count]);
      reader.onload = (_event) => { 
        let imgURL = reader.result;
        this.files[count].viewUrl = imgURL;
      }
    }, 2000);
  }

  /* Checking Validation */
  checkingValidation(element) {
    let valid: any = { status: true, message: null };

    /* Checking File Format */
    let format = element.type.split("/");
    let check = this.configData.format.includes(format[1]);
    if (check == false) {
      valid.status = false;
      valid.message = format[1] + " format not supported.";
      return valid;
    }

    /* Checking File size */
    if (element.size / 1000 > this.configData.size) {
      valid.status = false;
      valid.message = "File size too large. Maximum file size limit: " + this.configData.size + " KB.";
      return valid;
    }

    if (valid.status == true) {
      return valid;
    }
  }

  /* File Upload Process */
  uploadAll(getIndex: any = null) {
    for (let index = 0; index < this.files.length; index++) {
      if(this.files[index].valid.status == true && this.files[index].upload.status != 'complete') {
        this.uploading(index);
      }
    }
  }

  /* Upload */
  uploading(index) {
    let postData: any = {
      file: this.files[index],
      type: "bulk-upload",
      path: "files",
      prefix: "image_"
    }

    let url: string = this.configData.baseUrl + this.configData.endpoint + '?path=' + this.configData.path + '&prefix=' + this.configData.prefix + '&type=' + this.configData.type + '&rand=' + index;

    this.fileUploadService.upload(url, postData).subscribe(
      (response) => {
        let result: any = response;
        switch (result.status) {
          case 'complete':
            this.files[index].upload = result;
            this.configData.files = this.files;
            this.openSnackBar('Successfully Uploaded !!', 'Undo');
            break;
          case 'error':
            this.files[index].upload = result.data;
            this.openSnackBar(result.data, '');
            break;
          default:
            this.files[index].upload = result;
            break;
        }
      }, (err) => {
        this.files[index] = { status: 'error' };
        this.openSnackBar('An error occurred !!', 'Retry');
      }
    );
  }

  /* Remove Files */
  removeFiles(index: any = null) {
    this.openDialog();
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.files.splice(index, 1);
        this.openSnackBar('Successfully Remove !!', '');
      }
    });
  }

  /* Snack Bar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /* Dialog Box */
  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { message: "Message" }
    });
  }

  /* Delete all selected files */
  deleteAll() {
    this.files.splice(0, this.files.length);
  }

  /* Preview Files */
  previewFiles(index) {
    var mimeType = this.files[index].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log('Preview not supported.');
      return;
    }
 
    var reader = new FileReader();
    let imagePath = this.files[index];
    reader.readAsDataURL(this.files[index]);
    reader.onload = (_event) => { 
      let imgURL = reader.result; 
      const dialogRef = this.dialog.open(PreviewFilesComponent, {
        data: { imgURL: imgURL }
      });
    }
  }

}
