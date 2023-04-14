interface TrainingValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (args: number[]): TrainingValues => {
    const periodLength = args.length
    const trainingDays = args.filter(item => item).length
    const average = args.reduce((sum, elem) => sum + elem)/args.length
    const success = average >= 2 ? true : false
    const rating = average >= 2 ? 3 : average < 1 ? 1 : 2
    let ratingDescription
    switch (rating) {
        case 3:
            ratingDescription = 'Excellent'
            break;
        case 2:
            ratingDescription = 'Not too bad but could be better'
            break;
        case 1:
            ratingDescription = 'Bad'
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
        target: 2,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))
