import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFechaPage } from './edit-fecha.page';

describe('EditFechaPage', () => {
  let component: EditFechaPage;
  let fixture: ComponentFixture<EditFechaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFechaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
