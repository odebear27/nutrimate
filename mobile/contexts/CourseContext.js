import { Children, createContext, useState } from "react";

export const CourseContext = createContext({
  courseCuisines: [],
  setCourseCuisines: () => {},
  courseList: [],
  setCourseList: () => {},
  hasRegisteredCourse: false,
  setRegisteredCourse: () => {},
});

export function CourseContextProvider({ children }) {
  const [courseCuisines, setCourseCuisines] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [hasRegisteredCourse, setRegisteredCourse] = useState(false);

  const courseContext = {
    courseCuisines: courseCuisines,
    setCourseCuisines: setCourseCuisines,
    courseList: courseList,
    setCourseList: setCourseList,
    hasRegisteredCourse: hasRegisteredCourse,
    setRegisteredCourse: setRegisteredCourse,
  };

  return (
    <CourseContext.Provider value={courseContext}>
      {children}
    </CourseContext.Provider>
  );
}
