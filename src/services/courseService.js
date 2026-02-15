import { coursesData } from "../mock/coursesData";

export const getCourses = () => {
  return Promise.resolve(coursesData);
};
