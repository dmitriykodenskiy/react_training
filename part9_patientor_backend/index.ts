// This Middlewere makes possible requests from different origin
const cors = require('cors')
// eslint-disable-next-line
import express from 'express';
import diagnosesRouter from './src/routes/diagnoses'
import patientsRouter from './src/routes/patients'
const app = express();
app.use(express.json());
// This Middlewere makes possible requests from different origin
app.use(cors())

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientsRouter)
app.use('/api/diagnoses', diagnosesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});