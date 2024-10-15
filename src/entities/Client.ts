import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";

@Entity("client")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    name: "active",
    default: true,
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({ type: "simple-array" })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
