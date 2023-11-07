import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-range',
  templateUrl: './multi-range.component.html',
  styleUrls: ['./multi-range.component.scss']
})
export class MultiRangeComponent implements OnInit {

  // Para iniciar el componente se ele debe dar como mínimo segments y fControl.
  @Input()  public min:           number = 0;
  @Input()  public max:           number = 1;
  @Input()  public maxValue:      number = 0;
  @Input()  public minValue:      number = 0;
  @Input()  public minSegments:   string[] = []; // Array con el numero de segmentos del rango con etiquetas. Cada elemento del array es un segmento
  @Input()  public maxSegments:   string[] = []; // Array con el numero de segmentos del rango con etiquetas. Cada elemento del array es un segmento
  @Input()  public minFControl!:  AbstractControl | null; // FormControl asociado del forumuario reactivo
  @Input()  public maxFControl!:  AbstractControl | null; // FormControl asociado del forumuario reactivo
  
  @ViewChild('minRange', { static: false }) public minRange!: ElementRef<HTMLElement>;
  @ViewChild('maxRange', { static: false }) public maxRange!: ElementRef<HTMLElement>;


  public    minCurrentSegment:   string = "";
  public    maxCurrentSegment:   string = "";
  
  ngOnInit() {

    if(this.minFControl){
      this.minCurrentSegment = this.minSegments[this.minFControl.value];
      this.minValue = this.minFControl.value;
    }
    
    if(this.maxFControl){
      this.max = this.minSegments.length - 1;
      this.maxCurrentSegment = this.maxSegments[this.maxFControl.value];
      this.maxValue = this.maxFControl.value;
    }
    
    if(this.minValue === this.maxValue && this.maxValue < this.max){
      this.maxValue = this.minValue + 1;
      this.maxCurrentSegment = this.maxSegments[this.maxValue];
      this.maxFControl?.setValue(this.maxValue);
    }
    else if(this.minValue === this.maxValue && this.maxValue === this.max){
      this.minValue = this.maxValue - 1;
      this.minCurrentSegment = this.minSegments[this.minValue];
      this.minFControl?.setValue(this.minValue);
    }
  }

  onInputMinRange(event: any){
    //Actualizamos valores de formControl en el momento de mover el slider

    //Controla que el rango mínimo no pueda ser superior al máximo
    if (parseInt(event.target.value) >= this.maxFControl?.value){
      this.minFControl?.setValue(parseInt(this.maxFControl?.value));
      event.target.value = this.minFControl?.value;
    }
    //Se añade clase para alterar el z-index y poder modificar corretamente el rango en caso de solaparse ambos
    this.maxRange?.nativeElement.classList.remove('touched');
    this.minRange?.nativeElement.classList.add('touched');

    this.minValue = parseInt(event.target.value);
    this.minCurrentSegment = this.minSegments[event.target.value];
    this.minFControl?.setValue(parseInt(event.target.value));
  }
  
  onInputMaxRange(event: any){
    //Actualizamos valores de formControl en el momento de mover el slider

    //Controla que el rango máximo no pueda ser inferior al mínimo
    if (parseInt(event.target.value) <= this.minFControl?.value){
      this.maxFControl?.setValue(parseInt(this.minFControl?.value));
      event.target.value = this.maxFControl?.value;
    }
    //Se añade clase para alterar el z-index y poder modificar corretamente el rango en caso de solaparse ambos
    this.minRange?.nativeElement.classList.remove('touched');
    this.maxRange?.nativeElement.classList.add('touched');
    
    this.maxValue = parseInt(event.target.value);
    this.maxCurrentSegment = this.maxSegments[event.target.value];
    this.maxFControl?.setValue(parseInt(event.target.value));
  }

  onMinRangeChange(event: any) {
    // Actualizar el segmento actual y el valor del FormControl.
    this.minFControl?.setValue(parseInt(event.target.value));
    this.minValue = this.minFControl?.value;
  }

  onMaxRangeChange(event: any) {
    // Actualizar el segmento actual y el valor del FormControl.
    this.maxFControl?.setValue(parseInt(event.target.value));
    this.maxValue = this.maxFControl?.value;
  }

}
