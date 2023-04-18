import express from 'express';
import calculateBmi from './bmiCalculator'
const app = express();
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query
    const bmi = calculateBmi(Number(height), Number(weight))
    res.send({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});