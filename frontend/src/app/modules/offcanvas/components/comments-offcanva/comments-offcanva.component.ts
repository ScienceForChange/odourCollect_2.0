import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observation } from 'src/app/models/observation';
import { User } from 'src/app/models/user';
import { DialogModalComponent } from 'src/app/modules/modals/dialog-modal/dialog-modal.component';

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
    ) { }

  ngAfterViewInit (): void {
      if(this.addCommnetary){
        setTimeout(() => {
          this.inputCommentary.nativeElement.focus();
        }, 100);
      }
  }

  public toggleDeleteButton(event:Event): void {
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
    comment.style.height = comment.offsetHeight + 'px';
    setTimeout(() => {
        comment.classList.add('deleting');
        comment.style.height = '0';
        this.loadingDelete = false;
        setTimeout(() => {
          comment.remove();
        }, 1000);
    }, 3000);
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
    
    const commentariesContainer = this.commentariesContainer.nativeElement as HTMLTextAreaElement;
  
    this.loading = true;
    setTimeout(() => {
      this.listComments.unshift({
        user: {
          id: 2609,
          avatar: 1
        },
        text: this.commentaryForm.controls['commentary'].value,
        date: new Date(),
      });
      setTimeout(()=>{
        const lastCommentary = commentariesContainer.firstElementChild?.firstElementChild as HTMLElement;
        const height = lastCommentary.offsetHeight;
        lastCommentary.style.height = '0';
        this.commentaryForm.controls['commentary'].reset();
        this.loading = false;
        commentariesContainer.scrollTo(0, 0)
        lastCommentary.classList.add('new');
        lastCommentary.style.height = height + 'px';
        setTimeout(() => {
          lastCommentary.classList.remove('new');
        }, 1000);
      });

    }, 2000);
  }
}