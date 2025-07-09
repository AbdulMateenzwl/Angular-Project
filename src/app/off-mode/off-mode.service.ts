import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OffModeService {
  private startDate!: Date;
  private endDate!: Date;
  private reason!: string;

  setOffMode(reason: string, startDate: Date, endDate: Date): void {
    this.reason = reason;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  get isOffModeActive(): boolean {
    if (this.startDate && this.endDate) {
      const now = new Date();
      return now >= this.startDate && now <= this.endDate;
    }
    return false;
  }

  clearOffMode() {
    this.reason = '';
    this.startDate = new Date();
    this.endDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  }
}
