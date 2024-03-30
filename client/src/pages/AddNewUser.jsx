import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { errorToast, successToast } from "../utils/customToast";
import axios from "axios";

const AddNewUser = () => {
  const [facultyEmail, setFacultyEmail] = useState("");
  const [studentData, setStudentData] = useState({
    email: "",
    studentId: "",
  });

  const { email, studentId } = studentData;

  const handleStudentChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFacultyChange = (e) => {
    setFacultyEmail(e.target.value);
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("newStudent", studentData);
      successToast("Student added successfully");
    } catch (error) {
      errorToast(error.response.data);
    }
  };

  const handleSubmitFaculty = async (e) => {
    e.preventDefault();
    try {
      await axios.post("newFaculty", { email: facultyEmail });
      successToast("Faculty added successfully");
    } catch (error) {
      errorToast(error.response.data);
    }
  };

  return (
    <div className="w-96">
      <form
        method="post"
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmitStudent}
      >
        <p>Add Student</p>
        <Input
          value={email}
          name="email"
          onChange={handleStudentChange}
          type="email"
          label="Email"
        />
        <Input
          value={studentId}
          name="studentId"
          onChange={handleStudentChange}
          type="text"
          label="Student ID"
        />
        <Button type="submit" color="primary">
          Add Student
        </Button>
      </form>
      <form
        method="post"
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmitFaculty}
      >
        <p>Add Faculty</p>
        <Input
          value={facultyEmail}
          name="facultyEmail"
          onChange={handleFacultyChange}
          type="email"
          label="Email"
        />
        <Button type="submit" color="primary">
          Add Faculty
        </Button>
      </form>
    </div>
  );
};

export default AddNewUser;
