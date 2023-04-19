import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator'
const app = express();
// This Middlewere parses json and puts it to request.body
app.use(express.json())
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;
    
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

app.post('/exercises', (req, res) => {
    let { daily_exercises, target } = req.body;
    
    const transformedTarget = Number(target)
    
    const exercises = Array.isArray(daily_exercises) ? daily_exercises.map(item => Number(item)) : null
    
    if (typeof transformedTarget !== 'number' || !exercises || exercises.includes(NaN)) {
        throw new Error('malformatted parameters');
    } else {
        const result = calculateExercises(exercises, transformedTarget)
        res.send(result);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});