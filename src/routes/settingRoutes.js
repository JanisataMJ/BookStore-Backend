const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
// const upload = multer();
// const { verifyJWT } = require("../../../_middleware/auth");


const setting_controller = require("../controllers/settingController");
const { uploadExcelFile } = require("../controllers/settingController");


router.get('/getSamplingProcessMaster', setting_controller.getSamplingProcessMaster);
// router.get('/getSamplingItemMaster', setting_controller.getSamplingItemMaster);


router.get('/scaniosampling/gettolerance_weight', setting_controller.getToleranceWeight);
router.put('/scaniosampling/puttolerance_weight', setting_controller.putToleranceWeight);  

router.post('/scaniosampling/insertproductcode_accessory', setting_controller.insertProductcodeAccessory);
router.post('/scaniosampling/insertproductcode_accessory_items', setting_controller.insertProductcodeAccessoryItems); 
router.get('/scaniosampling/getproductcode_accessory', setting_controller.getProductcodeAccessory);
router.put('/scaniosampling/putproductcode_accessory', setting_controller.putProductcodeAccessory); 

router.post('/scaniosampling/insertproductcode_robbery', setting_controller.insertProductcodeRobbery);
router.get('/scaniosampling/getproductcode_robbery', setting_controller.getProductcodeRobbery);
router.put('/scaniosampling/putproductcode_robbery', setting_controller.putProductcodeRobbery); // flag use 1/0


// router.post('/scaniosampling/insertGID', setting_controller.insertGID); //ยังไม่ทำ
// router.get('/scaniosampling/getGID', setting_controller.getGID); //ยังไม่ทำ
// router.put('/scaniosampling/putGID', setting_controller.putGID); //flag use 1/0
router.post('/scaniosampling/upload_excel_LeaderConfirm', upload.single("file"), uploadExcelFile);



module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require('multer');
// //const upload = multer();
// const { verifyJWT } = require("../../../_middleware/auth");


// const setting_controller = require("./setting_controller");
// const { uploadExcelFile } = require("./setting_controller");
// const upload = require("./setting_middleware");


// router.get('/getSamplingProcessMaster', setting_controller.getSamplingProcessMaster);
// //router.get('/getSamplingItemMaster', setting_controller.getSamplingItemMaster);


// router.get('/scaniosampling/gettolerance_weight', setting_controller.getToleranceWeight);
// router.put('/scaniosampling/puttolerance_weight', setting_controller.putToleranceWeight);  


// router.post('/scaniosampling/insertproductcode_accessory', setting_controller.insertProductcodeAccessory); // Check
// router.post('/scaniosampling/insertproductcode_accessory_items', setting_controller.insertProductcodeAccessoryItems); // Check
// router.get('/scaniosampling/getproductcode_accessory', setting_controller.getProductcodeAccessory);
// router.put('/scaniosampling/putproductcode_accessory', setting_controller.putProductcodeAccessory); // Check


// router.post('/scaniosampling/insertproductcode_robbery', setting_controller.insertProductcodeRobbery); // Check
// router.get('/scaniosampling/getproductcode_robbery', setting_controller.getProductcodeRobbery);
// router.put('/scaniosampling/putproductcode_robbery', setting_controller.putProductcodeRobbery); // edit ProductCode
// router.put('/scaniosampling/deleteproductcode_robbery', setting_controller.deleteLeaderConfirm); //ลบ flag use 1/0// flag use 1/0




// router.post('/scaniosampling/insertLeaderConfirm', setting_controller.insertLeaderConfirm);
// router.get('/scaniosampling/getLeaderConfirm', setting_controller.getLeaderConfirm);
// router.put('/scaniosampling/putLeaderConfirm', setting_controller.putLeaderConfirm); // edit ProductCode
// router.put('/scaniosampling/deleteLeaderConfirm', setting_controller.deleteLeaderConfirm); //flag use 1/0
// router.post('/scaniosampling/upload_excel_LeaderConfirm', upload.single("excel"), uploadExcelFile); //ยังไม่ทำ


// module.exports = router;


