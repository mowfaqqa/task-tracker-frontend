import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import { InputField, TextareaField } from "../Inputfields";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { AddTaskProps, TaskProps } from "@/lib/interfaces";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { toast } from "react-toastify";

const EditForm = ({ task, onCancel, getTasks }: any) => {
  const router = useRouter();

  const editTaskQuery = (values: AddTaskProps) => {
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .patch(`/tasks/${task?._id}`, values)
      .then((res) => {
        router.push("/");
        toast.success(res?.data.message);
        getTasks()
        formik.resetForm();
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };
  const formik = useFormik({
    initialValues: {
      title: task?.title,
      description: task?.description,
    },
    onSubmit: (values) => {
      try {
        editTaskQuery(values);
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
            value: formik?.values?.title,
            onChange: formik?.handleChange("title"),
            onBlur: formik?.handleBlur("title"),
          }}
          error={!!formik?.touched?.title && !!formik?.errors?.title}
          // helperText={!!formik?.touched?.title && formik?.errors?.title}
        />
        <TextareaField
          type="text"
          id="description"
          label="Task Description"
          required
          placeholder="Enter Task Details"
          inputProps={{
            value: formik?.values?.description,
            onChange: formik?.handleChange("description"),
            onBlur: formik?.handleBlur("description"),
          }}
          error={
            !!formik?.touched?.description && !!formik?.errors?.description
          }
          // helperText={
          //   !!formik?.touched?.description && formik?.errors?.description
          // }
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
          onClick={formik?.handleSubmit}
        >
          Edit Task
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
