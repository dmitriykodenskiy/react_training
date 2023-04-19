interface TrainingValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const argsSliced = args.slice(2).map(item => Number(item));
    
    if (argsSliced.includes(NaN)) {
        throw new Error('Provided values were not numbers!');
    } else {
        return argsSliced;
    }
};

const calculateExercises = (args: number[], target: number): TrainingValues => {
    const periodLength = args.length;
    const trainingDays = args.filter(item => item).length;
    const average = args.reduce((sum, elem) => sum + elem)/args.length;
    const success = average >= 2 ? true : false;
    const rating = average >= 2 ? 3 : average < 1 ? 1 : 2;
    let ratingDescription = 'No rating available';
    switch (rating) {
        case 3:
            ratingDescription = 'Excellent';
            break;
        case 2:
            ratingDescription = 'Not too bad but could be better';
            break;
        case 1:
            ratingDescription = 'Bad';
            break;
    
        default:
            break;
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
    const array = parseArguments(process.argv);
    console.log(calculateExercises(array, 2.5));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
export default calculateExercises;