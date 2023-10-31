import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexedDBService } from '../../service/indexed-db.service';


@Component({
  selector: 'app-setpic',
  templateUrl: './setpic.component.html',
  styleUrls: ['./setpic.component.css'],
})
export class SetpicComponent {
  imageData: any;
  public userid: any = localStorage.getItem('userId');
  file!: File;
  constructor(
    public dialogRef: MatDialogRef<SetpicComponent>,
    private snackBar: MatSnackBar,
    private indexeddb: IndexedDBService
  ) {
  }

  chooseImage (event: any){
    this.file = event.target.files[0];
  }

  async uploadImage() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result;
        console.log("result: ", result);
        
        if (result instanceof ArrayBuffer) {
          const id = await this.indexeddb.addImage(result);
          console.log('Image added with ID:', id);
        } else {
          console.error('Failed to read image data.');
        } 
      };
      reader.readAsArrayBuffer(this.file);
    }
    this.dialogRef.close()
  }

  async getImage() {
    const image = await this.indexeddb.getImage(this.userid);
    console.log("imageDATA: ", image);
    if (image) {
      this.imageData = URL.createObjectURL(new Blob([image.imageData]));
    } else {
      console.log('Image not found');
    }
  }
}
