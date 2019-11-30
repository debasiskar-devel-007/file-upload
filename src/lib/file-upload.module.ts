import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './Module/material-module';
import { HttpClientModule } from '@angular/common/http';
import { ListingModule } from "listing-angular7";
import { DragDropDirective } from './directive/drag-drop.directive';
import { AlertMessageComponent } from './component/alert-message/alert-message.component';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { PreviewFilesComponent } from './component/preview-files/preview-files.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    DragDropDirective,
    AlertMessageComponent,
    DialogBoxComponent,
    PreviewFilesComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListingModule,
  ],
  exports: [FileUploadComponent],
  entryComponents: [
    AlertMessageComponent,
    DialogBoxComponent,
    PreviewFilesComponent
  ]
})
export class FileUploadModule { }
