import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Worker } from 'src/worker/entities/worker.entity';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: ActionRepeat,
    default: ActionRepeat.ONCE,
  })
  repeat: ActionRepeat;

  @IsNotEmpty()
  @Column()
  executeDateTime: Date;

  @IsNotEmpty()
  @Column({ nullable: true })
  durationSeconds: number;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => Worker, (worker) => worker.actions)
  worker: Worker;
}
