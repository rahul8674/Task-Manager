import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Task } from './Task';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ unique: true })
  username!: string;
  
  @Column({ unique: true })
  email!: string;
  
  @Column()
  password!: string;
  
  @CreateDateColumn()
  created_at!: Date;
  
  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];
}
