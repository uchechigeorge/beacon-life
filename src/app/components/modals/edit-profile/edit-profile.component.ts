import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { editProfileModalID, profilePhotoActionSheetID, profilePhotoModalID } from 'src/app/models/component-id';
import { IEditInput } from 'src/app/models/input-models';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { profilePicActionSheetOptions } from './helper';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public PageTitle: string = 'Edit Profile';

  public FirstName: string = 'Emmanuel';
  public LastName: string = 'Soligbo';
  public StreetAddress: string = '#6 Banana Island';
  public CityOrTown: string = 'Lagos';
  public PhoneNumber: string = '0800 000 0000';

  public AnimateProfile: boolean = false;

  public EditInputs: IEditInput[] = [
    // First Name
    {
      id: EditInputID.FirstName,
      model: this.FirstName,
      label: 'Edit First Name',
      icon: 'person',
      type: 'text',
      hasHeader: true,
      headerTitle: 'Full Name',
      updateInput: async () => {
        return true;
      },
      inputChange: () => {
        this.FirstName = this.getInput(EditInputID.FirstName).model;
      },
      inputBlur: () => {

      }
    },
    // Last Name
    {
      id: EditInputID.LastName,
      model: this.LastName,
      label: 'Edit Last Name',
      icon: 'person',
      type: 'text',
      updateInput: async () => {
        return true;
      },
      inputChange: () => {
        this.LastName = this.getInput(EditInputID.LastName).model;
      },
      inputBlur: () => {

      }
    },
    // Street address
    {
      id: EditInputID.StreetAddress,
      model: this.StreetAddress,
      label: 'Edit Street Address',
      icon: 'home',
      type: 'text',
      hasHeader: true,
      headerTitle: 'Residential Address',
      updateInput: async () => {
        return true;
      },
      inputChange: () => {
        this.StreetAddress = this.getInput(EditInputID.StreetAddress).model;
      },
      inputBlur: () => {

      }
    },
    // City or Town
    {
      id: EditInputID.City,
      model: this.CityOrTown,
      label: 'Edit City',
      icon: 'business',
      type: 'text',
      updateInput: async () => {
        return true;
      },
      inputChange: () => {
        this.CityOrTown = this.getInput(EditInputID.City).model;
      },
      inputBlur: () => {

      }
    },
    // Phone Number
    {
      id: EditInputID.PhoneNumber,
      model: this.PhoneNumber,
      label: 'Edit Phone Number',
      icon: 'call',
      type: 'text',
      headerTitle: 'Phone Number',
      hasHeader: true,
      updateInput: async () => {
        return true;
      },
      inputChange: () => {
        this.PhoneNumber = this.getInput(EditInputID.PhoneNumber).model;
      },
      inputBlur: () => {

      }
    },
  ]

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', editProfileModalID);
  }

  getInput(id: EditInputID) {
    let input = this.EditInputs.find((input) => {
      return input.id == id;
    });

    return input;
  }

  async choosePictureAsync(){
    let options = profilePicActionSheetOptions();
    const actionSheet = await this.actionSheetCtrl.create(options);

    return await actionSheet.present();
  }

  async viewPictureAsync() {
    this.AnimateProfile = true;
    const modal = await this.modalCtrl.create({
      component: ProfilePictureComponent,
      id: profilePhotoModalID,
      animated: false,
    })

    this.wait(500)
      .then(async () => {
        this.AnimateProfile = false;
        return await modal.present();
      })
  }

  test = () => {
    console.log('hit');
  }

  wait = (ms) => new Promise<any>(resolve => setTimeout(resolve, ms));
}


export enum EditInputID{
  FirstName, 
  LastName,
  StreetAddress,
  City,
  PhoneNumber,
}