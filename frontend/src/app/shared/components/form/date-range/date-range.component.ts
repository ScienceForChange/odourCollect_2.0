import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  @Input() dateRangeControl!: AbstractControl | null;
  @Input() dateRange!: string[];

  public hoveredDate: NgbDate | null = null;
  public fromDate!: NgbDate | null;
  public toDate!: NgbDate | null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {}

  ngOnInit(): void {
    this.fromDate = this.convertToNgbDate(this.dateRange[0]);
    this.toDate = this.convertToNgbDate(this.dateRange[1]);
  }

  private convertToNgbDate(dateString: string) {
    const parts = dateString.split('-').map((x) => parseInt(x, 10));
    return new NgbDate(parts[0], parts[1], parts[2]);
  }

  formatDate(
    date: { year: number; month: number; day: number } | null,
  ): string | null {
    if (!date) return '';
    const dateObj = new Date(date.year, date.month - 1, date.day);
    const formatter = new Intl.DateTimeFormat('es', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    return formatter.format(dateObj);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    const toDate = this.toDate
      ? `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`
      : '';
    const fromDate = this.fromDate
      ? `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`
      : '';
    this.dateRangeControl?.setValue([fromDate, toDate]);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
