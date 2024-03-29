import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent implements OnDestroy{

  public user: User | undefined = this.userService.user;
  public newAvatar: number = this.user?.avatar_id ? this.user.avatar_id : 1;

  public loading: boolean = false;

  public defaultImg: string =  "url('https://i.stack.imgur.com/l60Hf.png')";

  public updateUser$!: Subscription;


  constructor(
    private userService: UserService,
    private route: Router,
    private elementRef: ElementRef,
    private alertService: AlertService,
    private navigationService: NavigationService
    ) {
      this.navigationService.footerVisible = false;
      this.navigationService.headerTitle = 'Editar avatar';
  }

  public selectNewAvatar(event: MouseEvent, id_avatar:number){
    // Buscar todos los elementos con la clase CSS 'selected'
    const selectedElements = this.elementRef.nativeElement.querySelectorAll('.selected');
    // Iterar a través de los elementos seleccionados y quitar la clase 'selected' de cada uno
    selectedElements.forEach((element: HTMLElement) => {
      element.classList.remove('selected');
    });
    // Agregar la clase 'selected' al avatar que se ha hecho clic
    const avatar = event.target as HTMLElement;
    avatar.classList.add('selected');
     // Actualizar el identificador del nuevo avatar seleccionado
    this.newAvatar = id_avatar;
    this.updateAvatar();
  }

  public updateAvatar(){
    this.loading = true;
    if(this.user &&  this.user.avatar_id != this.newAvatar ) this.user.avatar_id = this.newAvatar
    this.updateUser$ = this.userService.update().subscribe({
      next: () => {
        this.route.navigate(['/profile']);
        this.alertService.success('¡Avatar actualizado!', {autoClose: true})
        this.loading = false;
      },
      error: () => {
        this.alertService.error('Hubo un error, pruebalo de nuevo más tarde', { keepAfterRouteChange: false, autoClose: true });
        this.loading = false;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.updateUser$) this.updateUser$.unsubscribe();
  }

}
