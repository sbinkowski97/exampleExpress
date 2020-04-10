const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("quiz", { title: "quiz" });
});

module.exports = router;
