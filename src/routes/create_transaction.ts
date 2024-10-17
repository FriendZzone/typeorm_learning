import express, { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.post(
  "/api/client/:clientId/transaction",
  async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client = await Client.findOne({ where: { id: Number(clientId) } });

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    const transaction = Transaction.create({
      type,
      amount,
      client,
    });

    if (type === TransactionTypes.DEPOSIT) {
      client.balance = +client.balance + +amount;
    } else if (type === TransactionTypes.WITHDRAWAL) {
      client.balance = +client.balance - +amount;
    }
    await client.save();
    await transaction.save();

    res.status(201).json({
      msg: `Transaction created for client ${client.id}, balance: ${client.balance}`,
    });
    return;
  }
);

export { router as createTransactionRouter };
