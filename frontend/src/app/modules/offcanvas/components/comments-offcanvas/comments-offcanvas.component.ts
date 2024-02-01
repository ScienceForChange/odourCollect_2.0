import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/models/alert';
import { Observation, Comment } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { OdourService } from 'src/app/services/odour.service';

@Component({
  selector: 'app-comments-offcanvas',
  templateUrl: './comments-offcanvas.component.html',
  styleUrls: ['./comments-offcanvas.component.scss']
})
export class CommentsOffcanvasComponent implements AfterViewInit {

  @Input() user!: User;
  @Input() observation!: Observation;
  @Input() addCommnetary!: boolean;
  @ViewChild('commentary') inputCommentary!: ElementRef;
  @ViewChild('commentaries') commentariesContainer!: ElementRef;

  public loading: boolean = false;
  public loadingDelete: boolean = false;

  public commentaryForm: FormGroup = new FormGroup({
    commentary: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ])
  });


  constructor(
    public offcanvas: NgbActiveOffcanvas,
    private modalService: NgbModal,
    private odourService: OdourService,
    private alertService: AlertService,
    ) {
     }

  ngAfterViewInit (): void {
      if(this.addCommnetary){
        setTimeout(() => {
          this.inputCommentary.nativeElement.focus();
          this.inputCommentary.nativeElement.click();
        }, 100);
      }
  }

  public toggleDeleteButton(event:Event): void {
    if(this.loadingDelete) return;

    // Quita la clase 'delete' de todos los elementos que la tengan
    const elementsWithDeleteClass = document.querySelectorAll('.delete');
    elementsWithDeleteClass.forEach(element => {
      if (element !== event.currentTarget) {
        element.classList.remove('delete');
      }
    });

    // Agrega la clase 'delete' al elemento que disparó el evento si no la tiene,
    // o la quita si ya la tiene
    const comment = event.currentTarget as HTMLElement;
    comment.classList.toggle('delete');

  }

  public deleteComment(idCommentary: number): void {
    const dialog = this.modalService.open(DialogModalComponent, {
      windowClass: 'default',
      backdropClass: 'default',
      centered: true,
      size: 'sm',
    });
    dialog.componentInstance.config = {
      text: '¿Seguro que quieres eliminar tu comentario?',
      acceptButtonText: 'Eliminar',
    };
    dialog.result.catch((reason) => {
      if (reason === true) this.delete(idCommentary);
    });
  }

  private delete( idCommentary: number ){

    let comment = document.getElementById('comment-' + idCommentary) as HTMLElement;

    this.loadingDelete = true;

    this.odourService.deleteCommentary(this.observation.id, idCommentary).subscribe({
      next: () => {
        comment.style.height = comment.offsetHeight + 'px';
        comment.classList.add('deleting');
        this.loadingDelete = false;
        setTimeout(() => {comment.style.height = '0'})
        setTimeout(() => {
          this.observation.relationships.comments = this.observation.relationships.comments.filter(comment => comment.id !== idCommentary);
        }, 1000);
      },
      error: () => {
        this.alertService.error(
          'No se ha podido eliminar el comentario', {
            autoClose: true,
            keepAfterRouteChange: true,
          }
        );
        this.loadingDelete = false;
      }
    });
  }

  public resizeTextArea(): void {
    const commentary = this.inputCommentary.nativeElement as HTMLTextAreaElement;
    commentary.style.height='1px';
    commentary.style.height = commentary.scrollHeight + 'px';
  }

  public focusOnLastCharacter(): void {
    this.inputCommentary.nativeElement.focus();
    const commentary = this.inputCommentary.nativeElement as HTMLTextAreaElement;
    const initialText = commentary.value;
    setTimeout(() => {
      commentary.value = "";
      commentary.value = initialText;
      commentary.scrollTo(0, commentary.scrollHeight)
    },0);
  }

  public send(){

    const commentariesContainer = this.commentariesContainer.nativeElement as HTMLElement;

    this.loading = true;
    const text = this.commentaryForm.controls['commentary'].value;

      this.odourService.addCommentary(text, this.user.id ? this.user.id : 0 , this.observation.id).subscribe(
        {
          next: (resp) => {
            console.log(resp.data.resource);
            let newCommentary: Comment = resp.data.resource;
            this.observation.relationships.comments.unshift(newCommentary);
            this.commentaryForm.controls['commentary'].reset();

            setTimeout(()=>{
              const lastCommentary = commentariesContainer.firstElementChild?.firstElementChild as HTMLElement;
              const height = lastCommentary.offsetHeight;
              lastCommentary.style.height = '0';
              lastCommentary.classList.add('new');
              if(commentariesContainer.scrollTop > 0){
                commentariesContainer.scrollTo(0, 0)
                this.scrollTo(commentariesContainer, 0).then(() => {
                  console.log('done')
                  this.addCommentaryOnlist(height)
                });
              }
              else{
                this.addCommentaryOnlist(height)
              }
              this.resizeTextArea();
              this.loading = false;
            });

          },
          error: () => {
            this.alertService.error(
              'No se ha podido enviar el comentario', {
                autoClose: true,
                keepAfterRouteChange: true,
              }
            );
            this.loading = false;
          }
        }
      );
  }

  private scrollTo(element: HTMLElement, to:number) {

    element.scrollTo(to, to);

    return new Promise<void>(function(resolve) {
      element.addEventListener('scrollend', function() {
        resolve();
      }, { once: true });
    });
  }

  private addCommentaryOnlist(height:number): void {
    console.log(height);
    const commentariesContainer = this.commentariesContainer.nativeElement as HTMLElement;
    const lastCommentary = commentariesContainer.firstElementChild?.firstElementChild as HTMLElement;
    lastCommentary.classList.add('newAnimated');
    lastCommentary.style.height = height + 'px';
    setTimeout(() => {
      lastCommentary.classList.remove('new','newAnimated');
    }, 1000);
  }
}
