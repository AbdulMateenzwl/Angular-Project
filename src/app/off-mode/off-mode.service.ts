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
}
