const router = require("express").Router();
const controller = require("../Controller/controller");

router.post("/save", controller.add);
router.get("/all", controller.getAll);
router.post("/find", controller.findOne);
router.put("/update", controller.updateRecord);
router.put("/bulk", controller.bulkUpdate);
router.delete("/remove1", controller.deleteParticularRecord);
router.delete("/removeAll", controller.deleteAllRecord);

router.post("/insert", controller.addData);
router.get("/search", controller.findAll);
router.post("/select", controller.selectOne);
router.put("/modify", controller.updateOne);
router.delete("/remove", controller.deleteOne);
module.exports = router;
