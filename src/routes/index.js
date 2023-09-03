const express = require ('express');
const router = express.Router();
const indexController = require ('../controllers/indexController')

router.get('/', indexController.index);
router.get('/:campeon', indexController.campeon);

router.delete("/:id", indexController.deleteChamp);

router.patch("/:id", indexController.updateChamp)

router.post("/newChamp", indexController.newChamp);


module.exports = router; 