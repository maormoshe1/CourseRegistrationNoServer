import { createContext, useState, useEffect } from "react";
import Course from "./Types/Course";
import APIRequests from "./APIRequests";

export const CoursesContext = createContext<CoursesContextType | null>(null);

type CoursesContextType = {
  allCourses: Course[];
  chosenCourses: Course[];
  takenCourses: Course[];
  addNewCourse: (courseName: string, courseDate: Date, info: string) => void;
  addNewDate: (id: number, courseDate: Date) => void;
  addChosenCourse: (chosenCourse: Course) => void;
  deleteChosenCourse: (id: number) => void;
  clearChosenCourses: () => void;
  addTakenCourse: (course: Course) => void;
  deleteTakenCourse: (id: number) => void;
};

type CoursesContextProviderProps = {
  children: React.ReactNode;
};

const CoursesProvider: React.FC<CoursesContextProviderProps> = ({
  children,
}) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [chosenCourses, setChosenCourses] = useState<Course[]>([]);
  const [takenCourses, setTakenCourses] = useState<Course[]>([]);

  useEffect(() => {
    APIRequests.getAllCourses()
      .then((result) => {
        setAllCourses(result);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  useEffect(() => {
    APIRequests.getTakenCourses()
      .then((result) => {
        setTakenCourses(result);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const addNewCourseLocal = (id: number, courseName: string, courseDate: Date, info: string) => {
    let newDates: Date[] = [courseDate];
    let newCourse: Course = {
      id: id,
      name: courseName,
      dates: newDates,
      info: info,
    };
    setAllCourses((prevAllCourses) => {
      return [...prevAllCourses, newCourse];
    });
  };

  const addNewDateLocal = (id: number, courseDate: Date) => {
    setAllCourses((prevAllCourses) =>
      prevAllCourses.map((course) => {
        return course.id === id
          ? { ...course, dates: [...course.dates, courseDate] }
          : course;
      })
    );
  };

  const addTakenCourseLocal = (takenCourse: Course) => {
    setTakenCourses((prevTakenCourses) => [...prevTakenCourses, takenCourse]);
  };

  const deleteTakenCourseLocal = (id: number) => {
    setTakenCourses((prevTakenCourses) =>
      prevTakenCourses.filter((takenCourse) => takenCourse.id !== id)
    );
  };

  const addNewCourse = (courseName: string, courseDate: Date, info: string) => {
    APIRequests.postNewCourse(courseName, courseDate, info, addNewCourseLocal);
  };

  const addNewDate = (id: number, courseDate: Date) => {
    APIRequests.postNewDate(id, courseDate, addNewDateLocal);
  };

  const addChosenCourse = (chosenCourse: Course) => {
    setChosenCourses((prevChosenCourses) => {
      return [...prevChosenCourses, chosenCourse];
    });
  };

  const deleteChosenCourse = (id: number) => {
    setChosenCourses((prevChosenCourses) =>
      prevChosenCourses.filter((chosenCourse) => chosenCourse.id !== id)
    );
  };

  const clearChosenCourses = () => {
    setChosenCourses([]);
  };

  const addTakenCourse = (takenCourse: Course) => {
    APIRequests.postTakenCourse(takenCourse, addTakenCourseLocal);
  };

  const deleteTakenCourse = (id: number) => {
    APIRequests.deleteTakenCourse(id, deleteTakenCourseLocal);
  };

  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        chosenCourses,
        takenCourses,
        addNewCourse,
        addNewDate,
        addChosenCourse,
        deleteChosenCourse,
        clearChosenCourses,
        addTakenCourse,
        deleteTakenCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
