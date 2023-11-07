import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FooterService } from 'src/app/services/footer.service';
import { UserService } from 'src/app/services/user.service';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
  public loading: boolean = false;

  public deleteForm: FormGroup = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private modalService: NgbModal,
    private footerService: FooterService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.footerService.visible = false;
  }

  send() {
    //Llamamos al modal de confirmación
    const dialog = this.modalService.open( DialogModalComponent, { windowClass: 'default', backdropClass: 'default', centered : true, size: 'sm' } )
    dialog.componentInstance.config = { 
      text: "¿Seguro que quieres eliminar tu cuenta?",
      acceptButtonText : "Eliminar",
    };
    dialog.result.then(
      () => {},
      //si el modal se cierra clicando en "Acpetar" llamamos a delete();
      (reason) => {
        if (reason === true) this.delete();
      },
    );
  }

  delete() {
    this.loading = true;
    this.userService.delete().subscribe({
      next: () => {
        this.loading = false;
        this.authService.isLoggedIn = false;
        this.router.navigate(['/']);
      },
      error: (resp) => {
        if (resp.status == 422) {
          Object.keys(resp.error.errors)
            .map((key) => key)
            .forEach((field) => {
              const errors: { [error: string]: true } = resp.error.errors[
                field
              ].reduce((acc: any, error: string) => {
                acc[error] = true;
                return acc;
              }, {});
              this.deleteForm.controls[field].setErrors(errors);
              this.deleteForm.controls[field].markAsTouched();
            });
        }
        this.loading = false;
      },
    });
  }
}
