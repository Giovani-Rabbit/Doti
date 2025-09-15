import { queryOptions } from "@tanstack/react-query";
import { fetchTasks } from "../module/module-serivce";

export const taskOptions = (moduleId: string) => queryOptions({
    queryKey: ["tasks", moduleId],
    queryFn: () => fetchTasks(moduleId),
    staleTime: 1000 * 60,
    initialData: [],
});