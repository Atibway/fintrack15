import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.currency[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.currency[":id"]["$patch"]>["json"];

export const useEditCurrency = ( id?:string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json)=> {
        const response = await client.api.currency
[":id"]["$patch"]({
          json,
          param: {id}
        })
        const responseData = await response.json();
      return responseData;
    },
    onSuccess: ()=> {
        toast.success("Currency updated");
        queryClient.invalidateQueries({queryKey: ["currency", {id}]});

    },
    onError: ()=> {
     toast.error("failed to edit Currency")   
    }
  })

  return mutation;
};
