import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteSignupPage } from './complete-signup.page';

describe('CompleteSignupPage', () => {
  let component: CompleteSignupPage;
  let fixture: ComponentFixture<CompleteSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
