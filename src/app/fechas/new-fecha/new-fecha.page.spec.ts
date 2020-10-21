import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewFechaPage } from './new-fecha.page';

describe('NewFechaPage', () => {
  let component: NewFechaPage;
  let fixture: ComponentFixture<NewFechaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFechaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
