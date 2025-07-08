import { Days } from "../enum/Days";
import { FrequencyType } from "../enum/FrequencyType";
import { RepeatType } from "../enum/RepeatType";
import { TimeOfDay } from "../enum/TimeOfDay";

export class Habit {
  public id: string;
  constructor(
    public title: string,
    public startDate: Date,
    public frequency: number,
    public frequenceyType: FrequencyType,
    public repeatType: RepeatType,
    public repeatDays: Days[],
    public repeatDates: string[],
    public reminderTime: string,
    public timeOfDay: TimeOfDay,
    public progress: number
  ) {
    this.id = crypto.randomUUID();
  }
}

