
import express from 'express'
import doctorController from "../controllers/doctor.js";
const router = express.Router();

router.get('/filter', doctorController.listDoctors);

router.post('/', doctorController.addDoctor);

router.get('/', doctorController.listAllDoctors);

export default router;