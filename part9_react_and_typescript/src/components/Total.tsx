interface SingleCourse {
    name: string;
    exerciseCount: number;
}
type Courses = SingleCourse[]
interface TotalProps {
    courseParts: Courses
}
const Total = (props: TotalProps) => {
    const { courseParts } = props;
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry: number, part: SingleCourse) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total