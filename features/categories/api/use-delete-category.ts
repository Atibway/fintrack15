import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;


export const useDeleteCategory = (id?:string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async ()=> {
        const response = await client.api.categories
[":id"]["$delete"]({
          param: {id}
        })
        const responseData = await response.json();
      return responseData;
    },
    onSuccess: ()=> {
        toast.success("Category Deleted");
        queryClient.invalidateQueries({queryKey: ["category", {id}]});
        queryClient.invalidateQueries({queryKey: ["categories"]});
        queryClient.invalidateQueries({queryKey: ["transactions"]});
        queryClient.invalidateQueries({queryKey: ["summary"]});
    },
    onError: ()=> {
     toast.error("failed to Delete Category")   
    }
  })

  return mutation;
};
