import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-single-range',
  templateUrl: './single-range.component.html',
  styleUrls: ['./single-range.component.scss'],
})
export class SingleRangeComponent implements OnInit {
  // Para iniciar el componente se ele debe dar como mínimo segments y fControl.
  @Input() public min: number = 0;
  @Input() public max: number = 1;
  @Input() public value: number = 0;
  @Input() public segments: string[] = []; // Array con el numero de segmentos del rango con etiquetas. Cada elemento del array es un segmento
  @Input() public fControl!: AbstractControl | null; // FormControl asociado del forumuario reactivo

  public currentSegment: string = '';

  ngOnInit() {
    if (this.fControl) {
      this.currentSegment = this.segments[this.fControl.value];
      this.max = this.segments.length - 1;
      this.value = this.fControl.value;
    }
  }

  onRangeChange(event: any) {
    // Actualizar el segmento actual y el valor del FormControl.
    this.currentSegment = this.segments[event.target.value];
    this.fControl?.setValue(parseInt(event.target.value));
  }
}
