interface SingleCourse {
    name: string;
    exerciseCount: number;
}
type Courses = SingleCourse[]
interface TotalProps {
    courseParts: Courses
}

const Content = (props: TotalProps) => {
    const { courseParts } = props;
    return(
        <div>
            {courseParts.map(course => {
                return(
                    <p key={course.name}>{course.name} {course.exerciseCount}</p>
                )
            })}
        </div>
    )
}

export default Content