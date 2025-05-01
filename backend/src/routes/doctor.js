
import express from 'express'
import doctorController from "../controllers/doctor.js";
const router = express.Router();

router.get('/', doctorController.listDoctors);

router.post('/', doctorController.addDoctor);

// Get doctor by ID (optional but useful)
router.get('/:id', doctorController.getDoctorById);

export default router;