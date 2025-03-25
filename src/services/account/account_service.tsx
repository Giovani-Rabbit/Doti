import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateAccountService() {
    const queryClient = useQueryClient();

    return useMutation({});
}