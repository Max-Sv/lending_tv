const router = require("express").Router();
const { OK, NO_CONTENT } = require("http-status-codes");
const smsService = require("../services/sms.service");
router.route("/").get(async (req, res, next) => {
    try {
        const result = await smsService.getAll();
        res.status(OK).json(result);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
