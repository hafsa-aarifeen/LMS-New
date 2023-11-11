import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "../../pages/Login";
import Home from "../../pages/Home";
import SideNavBar from "../SideNavBar";
import ListTeachers from "../../pages/Teachers/ListTeachers";
import ListCourses from "../../pages/Courses/ListCourses";

import StudentRegistration from "../Registration/Student";
import TeacherRegistration from "../Registration/Teacher";
import ListUnits from "../../pages/Courses/ListUnits";
import ListStudents from "../../pages/Student/ListStudents";
import StudentProfile from "../../pages/Student/StudentProfile";
import TeachersProfile from "../../pages/Teachers/TeachersProfile";
import RegistrationForm from "../Test/RegistrationForm";
import ConfirmationPage from "../Test/ConfirmationPage";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/reg" element={<RegistrationForm />}></Route>
        <Route
          path="/confirm-email/:email"
          element={<ConfirmationPage />}
        ></Route>
        <Route path="/lms" element={<SideNavBar />}>
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<ListCourses />} />
          <Route path="courses/units/:id" element={<ListUnits />} />
          <Route path="students" element={<ListStudents />} />
          <Route path="student/profile/:id" element={<StudentProfile />} />
          <Route path="studentRegistration" element={<StudentRegistration />} />
          <Route path="teachers" element={<ListTeachers />} />
          <Route path="teachers/profile/:id" element={<TeachersProfile />} />
          <Route path="teacherRegistration" element={<TeacherRegistration />} />
        </Route>
      </Route>
    )
  );
  return { router };
};

export { AppRouter };
