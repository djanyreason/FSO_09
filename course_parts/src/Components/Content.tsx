import { CoursePart } from '../Types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(
        (part: CoursePart): JSX.Element => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        )
      )}
    </div>
  );
};

export default Content;
