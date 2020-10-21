import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTurnoPage } from './new-turno.page';

describe('NewTurnoPage', () => {
  let component: NewTurnoPage;
  let fixture: ComponentFixture<NewTurnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTurnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTurnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
