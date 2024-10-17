import express, { Request, Response } from "express";
import { Client } from "../entities/Client";
const router = express.Router();

router.get("/api/client/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findOne({
    where: { id: Number(id) },
  });

  if (!client) {
    res.status(404).json({ error: "Client not found" });
    return;
  }
  res.status(200).json(client);
  return;
});

export { router as getClientRouter };
