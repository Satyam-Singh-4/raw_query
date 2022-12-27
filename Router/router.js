const router = require("express").Router();
const controller = require("../Controller/controller");
//crudRouter
router.post("/save", controller.add);
router.get("/all", controller.getAll);
router.post("/find", controller.findOne);
router.put("/update", controller.updateRecord);
router.put("/bulk", controller.bulkUpdate);
router.delete("/remove1", controller.deleteParticularRecord);
router.delete("/removeAll", controller.deleteAllRecord);
//One-To-One
router.post("/insert", controller.addData);
router.get("/search", controller.findAll);
router.post("/select", controller.selectOne);
router.put("/modify", controller.updateOne);
router.delete("/remove", controller.deleteOne);

//One-To-Many
router.post("/fill", controller.addValue);
router.post('/allFind',controller.searchAll)
router.post('/oneFind',controller.getOne)
router.put('/uSingle',controller.updateSingle)
router.delete('/sRemove',controller.deleteSingle)

module.exports = router;
