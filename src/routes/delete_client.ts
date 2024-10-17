import express, { Request, Response } from "express";
import { Client } from "../entities/Client";

const router = express.Router();
router.delete("/api/client/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findOne({ where: { id: Number(id) } });
  if (!client) {
    res.status(404).json({ error: "Client not found" });
    return;
  }
  await client.remove();
  res.status(200).json({ msg: "Client deleted successfully" });
});

export { router as deleteClientRouter };
