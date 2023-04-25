// eslint-disable-next-line
import express from 'express';
import services from '../services/diagnosesService';

const { getDiagnoses } = services

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnoses());
});



export default router;