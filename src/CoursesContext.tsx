import React, { createContext, useState } from "react";
import Course from "./Types/Course";
import courses from "./Data/courses";

export const CoursesContext = createContext<CoursesContextType | null>(null);

type CoursesContextType = {
  allCourses: Course[];
  chosenCourses: Course[];
  takenCourses: Course[];
  addNewCourse: (course: Course) => void;
  addNewDate: (newDate: Date, oldName: string) => void;
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
  const [allCourses, setAllCourses] = useState<Course[]>(courses);
  const [chosenCourses, setChosenCourses] = useState<Course[]>([]);
  const [takenCourses, setTakenCourses] = useState<Course[]>([]);

  const addNewCourse = (newCourse: Course) => {
    setAllCourses((prevAllCourses) => {
      return [...prevAllCourses, newCourse];
    });
  };

  const addNewDate = (newDate: Date, oldName: string) => {
    setAllCourses((prevAllCourses) =>
      prevAllCourses.map((course) => {
        return course.name === oldName
          ? { ...course, dates: [...course.dates, newDate] }
          : course;
      })
    );
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
    setTakenCourses((prevTakenCourses) => [...prevTakenCourses, takenCourse]);
  };

  const deleteTakenCourse = (id: number) => {
    setTakenCourses((prevTakenCourses) =>
      prevTakenCourses.filter((takenCourse) => takenCourse.id !== id)
    );
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
