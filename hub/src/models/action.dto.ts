export enum ActionRepeat {
  ONCE = "once",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface IActionDto {
  id: string;

  repeat: ActionRepeat;

  executeDateTime: Date;

  durationSeconds: number;

  isComplete: boolean;
}
