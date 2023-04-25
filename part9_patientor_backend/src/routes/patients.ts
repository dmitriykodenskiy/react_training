// eslint-disable-next-line
import express from 'express';
import services from '../services/patientsService';

const { getNonSensitivePatients } = services

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});



export default router;