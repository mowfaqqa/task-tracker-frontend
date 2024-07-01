"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../Card";
import { useRouter } from "next/router";
import CreateTaskForm from "./CreateTaskForm";
import Link from "next/link";
import Button from "../Button";
import { Eye, PenTool, Plus, Trash } from "react-feather";
import ViewTaskModal from "./ViewTaskModal";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { TaskProps } from "@/lib/interfaces";
import Badge from "../Badge";
import DialogModal from "../Dialog";
import EditForm from "./EditForm";
import { toast } from "react-toastify";
import EmptyState from "../EmptyState";

const TaskOverview = () => {
  const router = useRouter();
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [isDeleting, setIsDeleting] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>();

  // get Tasks
  const getTasks = useCallback(() => {
    setIsLoading(true);
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .get("/tasks")
      .then((res: any) => {
        setTasks(res?.data);
        setFilteredTasks(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
        setIsLoading(false);
      });
  }, []);

  // delete task logic
  const deleteTask = () => {
    setIsDeleting(true);
    axios
      .create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .delete(`/tasks/${taskId}`)
      .then((res) => {
        router.push("/");
        getTasks();
        toast.success(res?.data.message);
        setIsDeleting(false);
      })
      .catch(() => {
        toast.success("Error deleting task");
        setIsDeleting(false);
      });
  };
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    if (filter === "All") {
      setFilteredTasks(tasks!);
    } else {
      setFilteredTasks(tasks?.filter((task) => task?.status === filter)!);
    }
  }, [filter, tasks]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };
  return (
    <div className="shadow-md rounded-md p-4 mt-6 border">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-center">Task Tracker</h1>
        <div className="flex items-center gap-4">
          <select
            id="status-filter"
            className="py-2 text-xs border-b border-gray-400"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="to-do">To-do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <Link passHref as="/create_task" href="/?create_task=true">
            <Button
              variant="primary"
              prefix={<Plus size={15} />}
              className="text-xs py-2"
            >
              Add Task
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5 border-b border-yellow-700 px-4">
        <h3 className="font-semibold text-lg">S/N</h3>
        <h3 className="font-semibold text-lg">Task-ID</h3>
        <h3 className="font-semibold text-lg">Title</h3>
        <h3 className="font-semibold text-lg text-center">Status</h3>
        <h3 className="font-semibold text-lg text-center">Action</h3>
      </div>
      <>
        {filteredTasks?.length! > 0 ? (
          <>
            {filteredTasks?.map((task, index) => (
              <Card
                key={index}
                className="grid grid-cols-5 text-sm px-4 shadow-sm my-4 border-b border-gray-300"
              >
                <div>
                  <p>{++index}</p>
                </div>
                <div>
                  <p>{task.taskId}</p>
                </div>
                <div>
                  <p>{task.title}</p>
                </div>
                <div className="text-center">
                  <Badge
                    variant={`${
                      task.status === "to-do"
                        ? "tertiary"
                        : task.status === "in-progress"
                        ? "info"
                        : "success"
                    }`}
                    className={`py-2 px-4 text-sx`}
                  >
                    {task.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="text-xs text-primary-main"
                    onClick={() => {
                      setTask(task);
                      router.push("/?edit_task=true");
                    }}
                  >
                    <PenTool size={13} />
                  </Button>

                  <Button
                    className="text-xs text-gray-600"
                    onClick={() => {
                      setTaskId(task?._id);
                      router.push("/?view_task=true");
                    }}
                  >
                    <Eye size={13} />
                  </Button>

                  <Button
                    className="text-xs text-red-600"
                    onClick={() => {
                      setTaskId(task?._id);
                      router.push("/?delete_task=true");
                    }}
                  >
                    <Trash size={13} />
                  </Button>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <EmptyState title="No New tasks" src="/warning.svg">
            <div className="flex justify-center mt-4">
              <Link passHref as="/create_task" href="/?create_task=true">
                <Button
                  variant="primary"
                  prefix={<Plus size={15} />}
                  className="text-xs py-2 text-center"
                >
                  Add Task
                </Button>
              </Link>
            </div>
          </EmptyState>
        )}
      </>
      <>
        {router.query.create_task && (
          <DialogModal
            variant="scroll"
            open={false}
            onClose={() => router.back()}
          >
            <CreateTaskForm
              onCancel={() => router.push("/")}
              getTasks={getTasks}
            />
          </DialogModal>
        )}
        {router.query.edit_task && (
          <DialogModal
            variant="scroll"
            open={false}
            onClose={() => router.back()}
          >
            <EditForm
              onCancel={() => router.push("/")}
              task={task}
              getTasks={getTasks}
            />
          </DialogModal>
        )}
        {router.query.view_task && (
          <DialogModal
            variant="scroll"
            open={false}
            onClose={() => router.back()}
            taskId={taskId}
          >
            <ViewTaskModal
              onCancel={() => router.back()}
              taskId={taskId}
              getTasks={getTasks}
            />
          </DialogModal>
        )}
        {router.query.delete_task && (
          <DialogModal
            variant="scroll"
            open={false}
            onClose={() => router.back()}
            taskId={taskId}
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-center">Delete Task</h2>
              <div>
                <p className="text-md font-medium text-center my-3">
                  Are you sure you want to delete this task ??
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="danger"
                  onClick={() => router.back()}
                  className="text-xs py-2 bg-red-500 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-xs py-2"
                  onClick={deleteTask}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogModal>
        )}
      </>
    </div>
  );
};

export default TaskOverview;
