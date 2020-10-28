import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAcctComponent } from './edit-acct.component';

describe('EditAcctComponent', () => {
  let component: EditAcctComponent;
  let fixture: ComponentFixture<EditAcctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAcctComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAcctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
