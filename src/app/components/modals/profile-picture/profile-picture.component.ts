import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { profilePhotoModalID } from 'src/app/models/component-id';
import { profilePicActionSheetOptions } from '../edit-profile/helper';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {

  public PageTitle: string = 'Profile Photo';

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
  }

  async dismissModal() {
    const modal = await this.modalCtrl.getTop();
    modal.animated = true;
    this.modalCtrl.dismiss('', '', profilePhotoModalID);
  }

  async choosePictureAsync(){
    let options = profilePicActionSheetOptions();
    const actionSheet = await this.actionSheetCtrl.create(options);

    return await actionSheet.present();
  }

}
