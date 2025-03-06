import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  title!: string;
  
  @Column({ nullable: true })
  description!: string;
  
  @Column({ default: 'pending' })
  status!: string;
  
  @Column({ type: 'date', nullable: true })
  due_date!: Date;
  
  @CreateDateColumn()
  created_at!: Date;
  
  @UpdateDateColumn()
  updated_at!: Date;
  
  @ManyToOne(() => User, user => user.tasks)
  user!: User;
}
