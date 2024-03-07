import express from 'express';
import { createAppointments, getAppointments } from '../controllers/dateController.js';

const router = express.Router();

// POST Request zum Erstellen eines Termins
router.route('/create-appointment')
    .post(createAppointments);

// GET Request zum Abrufen aller Termine
router.route('/appointments')
    .get(getAppointments);

// Exportiere den Router
export default router;
