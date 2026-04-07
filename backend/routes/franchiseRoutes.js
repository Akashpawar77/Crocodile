const express = require("express");
const router = express.Router();

const { submitFranchise } = require("../controllers/franchiseController");

router.post("/", submitFranchise);

module.exports = router;