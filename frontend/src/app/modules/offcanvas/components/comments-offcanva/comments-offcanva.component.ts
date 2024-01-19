import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';
import { CommentaryService } from 'src/app/services/commentary.service';

@Component({
  selector: 'app-comments-offcanva',
  templateUrl: './comments-offcanva.component.html',
  styleUrls: ['./comments-offcanva.component.scss']
})
export class CommentsOffcanvaComponent implements AfterViewInit {

  @Input() user!: User;
  @Input() observation!: Observation;
  @Input() addCommnetary!: boolean;
  @ViewChild('commentary') inputCommentary!: ElementRef;
  @ViewChild('commentaries') commentariesContainer!: ElementRef;

  public listComments: any[] = [
    {
      user: {
        id: 1,
        avatar: 9
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    },
    {
      user: {
        id: 2609,
        avatar: 2
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    },
    {
      user: {
        id: 1,
        avatar: 3
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    },
    {
      user: {
        id: 2609,
        avatar: 2
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    },
    {
      user: {
        id: 1,
        avatar: 1
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    },
    {
      user: {
        id: 1,
        avatar: 7
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae? Lorem ipsum',
      date: new Date(),
    }
  ]

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
    private commentaryService: CommentaryService,
    ) { }

  ngAfterViewInit (): void {
      if(this.addCommnetary){
        setTimeout(() => {
          this.inputCommentary.nativeElement.focus();
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

  public deleteComment(event:Event): void {    
    const comment = event.currentTarget as HTMLElement;
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
      if (reason === true) this.delete(comment.parentElement as HTMLElement);
    });
  }

  private delete( comment: HTMLElement ){
    
    this.loadingDelete = true;
    
    this.commentaryService.deleteCommentary(comment).subscribe({
      next: (response) => {
        comment.style.height = comment.offsetHeight + 'px';
        comment.classList.add('deleting');
        comment.style.height = '0';
        this.loadingDelete = false;
        setTimeout(() => {
          comment.remove();
        }, 1000);
      },
      error: (error) => {
        console.log(error);
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
    
      this.commentaryService.addCommentary(text).subscribe(
        {
          next: (commentary) => {
            
            this.listComments.unshift(commentary);
            this.commentaryForm.controls['commentary'].reset();
      
            setTimeout(()=>{
              const lastCommentary = commentariesContainer.firstElementChild?.firstElementChild as HTMLElement;
              const height = lastCommentary.offsetHeight;
              lastCommentary.style.height = '0';
              lastCommentary.classList.add('new');
              if(commentariesContainer.scrollTop > 0){
                commentariesContainer.scrollTo(0, 0)
                this.scrollTo(commentariesContainer, 0).then(() => {
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
          error: (error) => {
            console.log(error);
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
    const commentariesContainer = this.commentariesContainer.nativeElement as HTMLElement;
    const lastCommentary = commentariesContainer.firstElementChild?.firstElementChild as HTMLElement;
    lastCommentary.classList.add('newAnimated');
    lastCommentary.style.height = height + 'px';
    setTimeout(() => {
      lastCommentary.classList.remove('new','newAnimated');
    }, 1000);
  }
}