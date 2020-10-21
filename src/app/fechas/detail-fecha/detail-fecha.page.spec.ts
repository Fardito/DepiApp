import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailFechaPage } from './detail-fecha.page';

describe('DetailFechaPage', () => {
  let component: DetailFechaPage;
  let fixture: ComponentFixture<DetailFechaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFechaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
