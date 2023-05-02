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

interface TotalProps {
    course: CoursePart
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
const Part = (props: TotalProps) => {
    const { course } = props
    switch (course.kind) {
        case 'basic':
            return(
                <div>
                    <div><b>{course.name} {course.exerciseCount}</b></div>
                    <div><i>{course.description}</i></div>
                </div>
            )
        case 'group':
            return(
                <div>
                    <div><b>{course.name} {course.exerciseCount}</b></div>
                    <div><span>Project exercises: {course.groupProjectCount}</span></div>
                </div>
            )
        case 'background':
            return(
                <div>
                    <div><b>{course.name} {course.exerciseCount}</b></div>
                    <div><i>{course.description}</i></div>
                    <div><span>Submit to {course.backgroundMaterial}</span></div>
                </div>
            )
        case 'special':
            return(
                <div>
                    <div><b>{course.name} {course.exerciseCount}</b></div>
                    <div><i>{course.description}</i></div>
                    <div><span>required skills: {course.requirements.join(', ')}</span></div>
                </div>
            )
        default:
            return assertNever(course);
    }
}

export default Part