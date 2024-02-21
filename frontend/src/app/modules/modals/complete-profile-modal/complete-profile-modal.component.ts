import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { errorFormater } from 'src/app/models/errorFormater';
import { Profile } from 'src/app/models/observation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complete-profile-modal',
  templateUrl: './complete-profile-modal.component.html',
  styleUrls: ['./complete-profile-modal.component.scss']
})
export class CompleteProfileModalComponent {
  private profile!: Profile;
  public loading: boolean = false;
  public years: number[] = [...Array(100).keys()]
    .map((x) => x + new Date().getFullYear() - 114)
    .reverse();
  public currentYear: number = new Date().getFullYear();

  constructor(
    private userService : UserService,
    public modalService: NgbActiveModal,
    ) { }

  public completeProfileForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      birth_year: new FormControl(this.years[0], [
        Validators.required,
        Validators.minLength(1),
      ]),
      gender: new FormControl('mujer', [
        Validators.required,
        Validators.minLength(1),
      ]),
    }
  );

  public send(): void {

    this.profile = this.completeProfileForm.value;
    this.loading = true;

    this.userService.completeProfileUser(this.profile).subscribe({
      next: () => {
        this.loading = false;
        this.modalService.close();
      },
      error: (resp) => {
        this.loading = false;
        if (resp.status == 422) {

          Object.keys(resp.error.errors).forEach((field:string) => {

            let errors = resp.error.errors[field];

            errors = errorFormater(errors);

            this.completeProfileForm.controls[field].setErrors(errors);
            this.completeProfileForm.controls[field].markAsTouched();
          });
        }
      },
    });
  }

}
