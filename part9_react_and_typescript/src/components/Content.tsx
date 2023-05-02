import Part from "./Part";
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartedDescripted extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartedDescripted {
    description: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartedDescripted {
    description: string;
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartRequirements extends CoursePartedDescripted {
    requirements: string[];
    kind: "special";
}
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
type Courses = CoursePart[]
interface TotalProps {
    courseParts: Courses
}

const Content = (props: TotalProps) => {
    const { courseParts } = props;
    return(
        <div>
            {courseParts.map(course => {
                return(<Part course={course} key={course.name}/>)
            })}
        </div>
    )
}

export default Content