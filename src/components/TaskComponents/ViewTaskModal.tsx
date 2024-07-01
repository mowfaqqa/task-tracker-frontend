import React, { useCallback, useEffect, useState } from "react";
import { SelectField } from "../Inputfields";
import Button from "../Button";
import Badge from "../Badge";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "@/lib/constants";
import { TaskProps } from "@/lib/interfaces";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Audio } from "react-loader-spinner";

const ViewTaskModal = ({ onCancel, taskId, getTasks }: any) => {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskProps>();
  const [isLoading, setIsLoading] = useState(false);
  const getSingleTask = useCallback(() => {
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .get("/tasks/" + taskId)
      .then((res: any) => {
        setIsLoading(false);
        setTasks(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching task", error);
      });
  }, [taskId]);

  useEffect(() => {
    setIsLoading(true);
    getSingleTask();
  }, [getSingleTask]);
  // update status
  const editStatusQuery = (status: { status: string }) => {
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .patch(`/tasks/status/${taskId}`, status)
      .then((res) => {
        router.push("/");
        toast.success(res?.data.message);
        getTasks();
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };
  const formik = useFormik({
    initialValues: {
      status: "",
    },
    onSubmit: (values: any) => {
      try {
        editStatusQuery(values);
      } catch (error) {
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center">
          <Audio height="80" width="80" color="green" ariaLabel="loading" />
        </div>
      ) : (
        <div>
          <h1 className="text-xl my-3 font-semibold">
            {tasks?.taskId} - {tasks?.title}
          </h1>
          <p className="text-base">{tasks?.description}</p>
          <div className="mt-3">
            <Badge
              variant={`${
                tasks?.status === "to-do"
                  ? "tertiary"
                  : tasks?.status === "in-progress"
                  ? "info"
                  : "success"
              }`}
              className={`py-2 px-4 text-sx`}
            >
              {tasks?.status}
            </Badge>
          </div>
          <div className="flex items-start gap-4 my-4">
            <p className="font-medium">Update Status :</p>
            <SelectField
              id="status"
              label=""
              inputProps={{
                value: formik?.values?.status,
                onChange: formik?.handleChange("status"),
                onBlur: formik?.handleBlur("status"),
              }}
            >
              <option value="todo">To do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </SelectField>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              variant="secondary"
              onClick={formik.handleSubmit}
              className="text-sm py-2 text-primary-main"
            >
              Update Status
            </Button>
            <Button
              variant="primary"
              onClick={onCancel}
              className="text-sm py-2"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTaskModal;
