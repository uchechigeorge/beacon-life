import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {

  public UploadBtnText: string = 'Upload';
  public SkipBtnText: string = 'Skip This Step';

  @Output('complete') completedEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {}

  async choosePictureAsync(){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'image',
          text: 'Choose from Gallery',
          cssClass: 'profile-action-sheet-button',
          handler: () => {
            console.log('Gallery clicked');
          }
        },
        {
          icon: 'camera',
          text: 'Take a photo',
          cssClass: 'profile-action-sheet-button',
          handler: () => {
            console.log('Camera clicked');
          }
        },
      ],
      header: 'Profile Photo',
   });

    return await actionSheet.present();
  }

  uploadImage() {
    if(this.completedEvent)
      this.completedEvent.emit();
  }

  skip() {
    if(this.completedEvent)
      this.completedEvent.emit();
  }
}
