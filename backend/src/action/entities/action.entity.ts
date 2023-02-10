import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Worker } from 'src/worker/entities/worker.entity';

export enum ActionRepeat {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ActionRepeat,
    default: ActionRepeat.ONCE,
  })
  repeat: ActionRepeat;

  @Column()
  executeDateTime: Date;

  @Column({ nullable: true })
  durationSeconds: number;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => Worker, (worker) => worker.actions)
  worker: Worker;
}
