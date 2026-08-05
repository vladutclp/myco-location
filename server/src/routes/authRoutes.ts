import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  console.log("req.body: ", req.body);
  res.send("Registration route");
});

router.post("/signup", (req, res) => {
  res.send("Signup route");
});

export default router;
