import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffModeService } from './off-mode.service';

@Component({
  selector: 'app-off-mode',
  templateUrl: './off-mode.component.html',
  styleUrls: ['./off-mode.component.css'],
})
export class OffModeComponent implements OnInit {
  @Input() onClose!: () => void;
  @ViewChild('bgbackdrop') backdropRef!: ElementRef<HTMLDivElement>;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private offModeService: OffModeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      reason: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        Validators.required,
      ],
    });
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target === this.backdropRef.nativeElement) {
      console.log('Backdrop clicked:', event);
      this.onClose?.();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { reason, startDate, endDate } = this.form.value;
      this.offModeService.setOffMode(reason, startDate, endDate);
      this.onClose?.();
    }
  }
}
