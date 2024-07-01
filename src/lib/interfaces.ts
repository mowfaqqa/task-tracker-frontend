export interface TaskProps {
  taskId: string;
  status: string;
  title: string;
  description: string;
  _id: string
}
export interface AddTaskProps {
  title: string | undefined;
  description: string | undefined;
}