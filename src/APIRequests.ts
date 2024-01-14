import Course from "./Types/Course";
import User from "./Types/User";

const url = "http://localhost:5000/api";

const getUser = async (): Promise<User> => {
  try {
    const response = await fetch(url + "/user");
    if (!response.ok) {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(url + "/courses");
    if (!response.ok) {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
    const data: Course[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const postNewCourse = async (
  courseName: string,
  courseDate: Date,
  info: string,
  addNewCourseLocal: (id: number, courseName: string, courseDate: Date, info: string) => void
) => {
  try {
    const response = await fetch(url + "/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: courseName,
        courseDate: courseDate,
        info: info,
      }),
    });
    if (response.ok) {
      const newCourse:Course = await response.json();
      addNewCourseLocal(newCourse.id, courseName, courseDate, info);
    } else {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

const postNewDate = async (
  id: number,
  courseDate: Date,
  addNewDateLocal: (id: number, courseDate: Date) => void
) => {
  try {
    const response = await fetch(url + `/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseDate: courseDate }),
    });
    if (response.ok) {
      addNewDateLocal(id, courseDate);
    } else {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

const getTakenCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(url + "/takenCourses");
    if (!response.ok) {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
    const data: Course[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const postTakenCourse = async (
  takenCourse: Course,
  addTakenCourseLocal: (takenCourse: Course) => void
) => {
  try {
    console.log(takenCourse);
    const response = await fetch(url + "/takenCourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(takenCourse),
    });
    if (response.ok) {
      addTakenCourseLocal(takenCourse);
    } else {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

const deleteTakenCourse = async (
  id: number,
  deleteTakenCourseLocal: (id: number) => void
) => {
  try {
    const response = await fetch(url + "/takenCourses/" + id, {
      method: "DELETE",
    });
    if (response.ok) {
      deleteTakenCourseLocal(id);
    } else {
      throw new Error(`Failed to fetch courses. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

const APIRequests = {
  getUser: getUser,
  getAllCourses: getAllCourses,
  postNewCourse: postNewCourse,
  postNewDate: postNewDate,
  getTakenCourses: getTakenCourses,
  postTakenCourse: postTakenCourse,
  deleteTakenCourse: deleteTakenCourse,
};

export default APIRequests;
