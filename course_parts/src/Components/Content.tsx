import { CoursePart } from '../Types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(
        (part: CoursePart): JSX.Element => (
          <Part key={part.name} part={part} />
        )
      )}
    </div>
  );
};

export default Content;
