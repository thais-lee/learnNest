import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('increment') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ type: 'boolean', default: false }) isCompleted: boolean;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
}
