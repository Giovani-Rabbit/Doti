"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { taskOptions, useCreateTaskMut } from "@/modules/task/task-query";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "@/modules/task/task-interface";
import { DialogDescription } from "@radix-ui/react-dialog";

type TaskName = { name: string; };

export default function CreateTaskButton() {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const moduleId = parseInt(id);

    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<TaskName>();

    const createTaskMut = useCreateTaskMut(moduleId);
    const tasksQueries = queryClient.getQueriesData<Task[]>(taskOptions(moduleId));

    const createTask: SubmitHandler<TaskName> = (data) => {
        const allTasks = tasksQueries.flatMap(([_, data]) => data ?? []);
        const taskCount = allTasks.length;

        createTaskMut.mutate(
            {
                module_id: parseInt(id),
                task_name: data.name,
                position: taskCount,
            },
            {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => setOpen(true)}>
                    <PlusIcon />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Create Task
                    </DialogTitle>
                    <DialogDescription>
                        <span className="flex items-center justify-between">
                            give your task a name
                            {createTaskMut.isPending && (
                                <Loader2 className="animate-spin ml-2 h-4 w-4" />
                            )}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(createTask)}>
                            <label htmlFor="name" className="sr-only">Task Name</label>
                            <Input id="name" {...register("name")} />
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
