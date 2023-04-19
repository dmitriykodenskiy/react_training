const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const argsSliced = args.slice(2).map(item => Number(item));
    
    if (argsSliced.includes(NaN)) {
        throw new Error('Provided values were not numbers!');
    } else if (argsSliced.length !== 2) {
        throw new Error('Wrong arguments number!');
    } else {
        return argsSliced;
    }
};

const calculateBmi = (...arr: number[]): string => {
    const [height, weight] = arr;
    const heightMeters = height/100;
    const bmi = Number((weight/(heightMeters*heightMeters)).toFixed(2));
    
    if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if(bmi >= 30) {
        return 'Obese';
    } else {
        return 'Overweight';
    }
};


try {
    const array: number[] = parseArguments(process.argv);
    console.log(calculateBmi(...array));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;