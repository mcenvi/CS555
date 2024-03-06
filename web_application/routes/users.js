import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    res.render("home");
  })
  .post(async (req, res) => {});

export default router;