const calculateBmi = (height: number, weight: number): String => {
    const heightMeters = height/100
    const bmi = Number((weight/(heightMeters*heightMeters)).toFixed(2))
    
    if (bmi < 25) {
        return 'Normal (healthy weight)'
    } else if(bmi >= 30) {
        return 'Obese'
    } else {
        return 'Overweight'
    }
}

console.log(calculateBmi(160, 74))