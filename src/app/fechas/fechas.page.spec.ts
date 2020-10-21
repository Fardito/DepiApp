import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FechasPage } from './fechas.page';

describe('FechasPage', () => {
  let component: FechasPage;
  let fixture: ComponentFixture<FechasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FechasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
