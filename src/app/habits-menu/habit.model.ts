import { Days } from "../enum/Days";
import { FrequencyType } from "../enum/FrequencyType";
import { HabitStatus } from "../enum/HabitStatus";
import { RepeatType } from "../enum/RepeatType";
import { TimeOfDay } from "../enum/TimeOfDay";

export class Habit {
  public id: string;
  constructor(
    public title: string,
    public startDate: Date,
    public status: HabitStatus,
    public frequency: number,
    public frequenceyType: FrequencyType,
    public progress: number,
    public repeatType: RepeatType,
    public timeOfDay: TimeOfDay,
    public repeatDays: Days[],
    public repeatDates: string[],
    public reminderTime: string,
  ) {
    this.id = crypto.randomUUID();
  }
}

