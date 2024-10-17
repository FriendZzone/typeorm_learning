import express, { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.post(
  "/api/banker/:bankerId/client/:clientId",
  async (req: Request, res: Response) => {
    const { bankerId, clientId } = req.params;
    const [client, banker] = await Promise.all([
      Client.findOne({ where: { id: Number(clientId) } }),
      Banker.findOne({ where: { id: Number(bankerId) } }),
    ]);

    if (!client || !banker) {
      res.status(404).json({ error: "Client or banker not found" });
      return;
    }

    banker.clients = banker.clients ? [...banker.clients, client] : [client];
    await banker.save();

    res.status(201).json({
      msg: "Banker connected to client successfully",
    });
  }
);

export { router as connectBankerToClientRouter };
