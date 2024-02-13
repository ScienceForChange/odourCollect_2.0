import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GamingModalComponent } from '../../../app/modules/modals/gaming-modal/gaming-modal.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('GamingModalComponent', () => {
  let component: GamingModalComponent;
  let fixture: ComponentFixture<GamingModalComponent>;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [
        RouterTestingModule,
        SharedComponentsModule
      ],
      declarations: [GamingModalComponent]
    });
    routerMock = TestBed.inject(Router);
    fixture = TestBed.createComponent(GamingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    component.config = {
      id:                 2,
      title:              'Congratulations!',
      text:               'You have won a badge!',
    }
    fixture.detectChanges();
    // comprobar que el titulo y el texto se han renderizado
    const title = fixture.debugElement.nativeElement.querySelector('h1');
    const text = fixture.debugElement.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Congratulations!');
    expect(text.textContent).toContain('You have won a badge!');
    expect(component).toBeTruthy();

  });

  it('should close modal', async () => {

    // Espía el método de cierre del modal
    jest.spyOn(component.modal, 'close');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.modal.close).toHaveBeenCalled();

  });

  it('should navigate to badges', async () => {

    jest.spyOn(component.modal, 'close');
    jest.spyOn(routerMock, 'navigate');
    component.openAboutBadgesOffcanvas();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/profile/badges']);
    expect(component.modal.close).toHaveBeenCalled();

  });

});
