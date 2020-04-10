const express = require("express");
const router = express.Router();
const News = require("../models/news");

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res) => {
  News.find({}, (err, data) => {
    console.log(data);

    res.render("admin/index", { title: "admin", data });
  });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "dodaj news", body: {}, errors: {} });
});

router.post("/news/add", (req, res) => {
  const body = req.body;

  const newsData = new News(body);

  const errors = newsData.validateSync();
  newsData.save((err) => {
    if (err) {
      res.render("admin/news-form", { title: "dodaj news", errors, body });
      return;
    }
  });

  res.redirect("/admin");
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect("/admin");
  });
});

module.exports = router;
