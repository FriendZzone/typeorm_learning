import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

@Entity("transactions")
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: TransactionTypes })
  type: TransactionTypes;

  @Column({ type: "numeric" })
  amount: number;
}
