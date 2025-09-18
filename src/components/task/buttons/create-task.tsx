"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { taskOptions, useCreateTaskMut } from "@/modules/task/task-query";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "@/modules/task/task-interface";
import { DialogDescription } from "@radix-ui/react-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TaskName = { name: string; };

const createTaskResolver: z.ZodType<TaskName> = z.object({
    name: z.string().trim().nonempty("Please write a name for the task"),
});

export default function CreateTaskButton() {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const moduleId = parseInt(id || "0");

    const [isDialogOpen, setDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TaskName>({
        resolver: zodResolver(createTaskResolver),
        defaultValues: { name: "" }
    });

    const createTaskMut = useCreateTaskMut(moduleId);
    const tasks = queryClient.getQueryData<Task[]>(taskOptions(moduleId).queryKey) ?? [];

    const createTask: SubmitHandler<TaskName> = (data) => {
        createTaskMut.mutate(
            {
                module_id: parseInt(id),
                task_name: data.name,
                position: tasks.length + 1,
            },
            {
                onSuccess: () => {
                    reset();
                    setDialogOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button size="sm" onClick={() => setDialogOpen(true)}>
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
                        give your task a name
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <form onSubmit={handleSubmit(createTask)}>
                            <label htmlFor="name" className="sr-only">Task Name</label>
                            <Input
                                error={errors.name?.message}
                                id="name"
                                {...register("name")}
                            />
                            <DialogFooter className="mt-4">
                                <Button type="submit" disabled={createTaskMut.isPending}>
                                    {createTaskMut.isPending ?
                                        <Loader2 className="animate-spin h-4 w-4" /> : "Create"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
