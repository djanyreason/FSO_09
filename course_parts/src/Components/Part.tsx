import { CoursePart } from '../Types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  let remainder: JSX.Element = <></>;

  switch (props.part.kind) {
    case 'basic':
      remainder = <em>{props.part.description}</em>;
      break;
    case 'group':
      remainder = <>project exercises {props.part.exerciseCount}</>;
      break;
    case 'background':
      remainder = (
        <>
          <em>{props.part.description}</em>
          <br />
          background material: {props.part.backgroundMaterial}
        </>
      );
      break;
    case 'special':
      remainder = (
        <>
          <em>{props.part.description}</em>
          <br />
          required skills:
          {props.part.requirements
            .reduce(
              (reqs: string, req: string): string => reqs + ' ' + req + ',',
              ''
            )
            .slice(0, -1)}
        </>
      );
      break;
    default:
      return assertNever(props.part);
  }
  return (
    <p>
      <strong>{props.part.name + ' ' + props.part.exerciseCount}</strong>
      <br />
      {remainder}
    </p>
  );
};

export default Part;
