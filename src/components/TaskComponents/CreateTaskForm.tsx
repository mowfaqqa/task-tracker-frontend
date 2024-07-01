"use client";
import React, { useCallback, useEffect, useState } from "react";
import { InputField, TextareaField } from "../Inputfields";
import Button from "../Button";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { AddTaskProps, TaskProps } from "@/lib/interfaces";
import { toast } from "react-toastify";

interface TaskFormProps {
  onCancel: any;
  getTasks: () => void;
}
const CreateTaskForm = ({ onCancel, getTasks }: TaskFormProps) => {
  const router = useRouter();

  // create Task
  const createTasks = (data: AddTaskProps) => {
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post("/tasks", data)
      .then((res: any) => {
        router.push("/");
        getTasks();
        toast.success(res?.data.message);
        formik.resetForm();
      });
  };

  // const formik = useFormik({
  //   initialValues: {
  //     title: initialTitle,
  //     description: initialDescription,
  //   },
  //   onSubmit: (values) => {

  //   },
  // });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema:
      router.query.create_task === "/create_task" ?? TASK_SCHEMA,
    onSubmit: (values) => {
      try {
        if (router.asPath === "/create_task") {
          createTasks(values);
          return;
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div className="py-2 px-10">
      <div className="font-semibold text-3xl text-gray-900 mt-8 mb-8">
        <h1>{router.query.create_task ? "Add Task" : "Edit Task"}</h1>
      </div>
      <div>
        <InputField
          type="text"
          id="title"
          label="Title"
          required
          placeholder="Enter Task title"
          inputProps={{
            values: formik?.values?.title,
            onChange: formik?.handleChange("title"),
            onBlur: formik?.handleBlur("title"),
          }}
          error={!!formik?.touched?.title && !!formik?.errors?.title}
          helperText={!!formik?.touched?.title && formik?.errors?.title}
        />
        <TextareaField
          type="text"
          id="description"
          label="Task Description"
          required
          placeholder="Enter Task Details"
          inputProps={{
            values: formik?.values?.description,
            onChange: formik?.handleChange("description"),
            onBlur: formik?.handleBlur("description"),
          }}
          error={
            !!formik?.touched?.description && !!formik?.errors?.description
          }
          helperText={
            !!formik?.touched?.description && formik?.errors?.description
          }
        />
      </div>
      <div className="mt-4 flex justify-center items-between gap-4">
        <Button
          variant="danger"
          onClick={onCancel}
          className="text-xs py-2 bg-red-500 text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="text-xs py-2"
          onClick={formik.handleSubmit}
        >
          {router.query.create_task ? "Add Task" : "Edit Task"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTaskForm;

const TASK_SCHEMA = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});
