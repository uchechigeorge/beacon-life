import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionsLoginPage } from './sessions-login.page';

describe('SessionsLoginPage', () => {
  let component: SessionsLoginPage;
  let fixture: ComponentFixture<SessionsLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionsLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
