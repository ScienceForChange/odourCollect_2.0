import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, OnDestroy {
  // Propiedad que almacenará el contenido de componente
  public content!: {
    title:  string | undefined,
    body:   string | undefined,
    footer: string | undefined
  };

  // Propiedades para manejar la suscripciones
  public translation$!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationService
    ){  
      
      // Obtener el valor del parámetro 'transTag' de la URL
      let param = this.route.snapshot.params['transTag'] ;
      
      if(param){
        // Suscribirse a un observable para obtener los datos de traducción
        this.translation$ = this.translationService.getTranslation(param).subscribe({
          next:(resp)=>{
            // Asignar la respuesta a la propiedad 'config'
            this.content = resp; 
          }
        });
      }
    }

  ngOnInit(){
    
  }

  ngOnDestroy(): void {
    this.translation$.unsubscribe();
  }

}
