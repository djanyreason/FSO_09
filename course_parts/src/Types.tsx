export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescirption extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescirption {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartWithDescirption {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartWithDescirption {
  requirements: string[];
  kind: 'special';
}
