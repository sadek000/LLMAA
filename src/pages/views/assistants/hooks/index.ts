import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataFetch } from "hooks";

export interface Assistant {
  id: string;
  title: string;
  description: string;
  type: number;
  dataSources: string[];
}

export const useAssistantData = (id?: string) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleNewAssistantClick = () => navigate("add");

  const { data: assistants, isLoading } = useDataFetch<{
    totalCount: string;
    items?: Assistant[];
  }>({
    endpoint: "/api/app/assisstant",
    queryKey: "get-all-assistants",
    method: "getSilent",
    enabled: !id,
  });

  const { data: assistantDetail, isLoading: assistantDataLoading } = useDataFetch<{
    message: string;
    data?: { [key: string]: any };
  }>({
    endpoint: `/api/app/assistant/${id}`,
    queryKey: "get-one-assistant",
    method: "getSilent",
    enabled: !!id,
  });

  return {
    assistants,
    isLoading,
    assistantDetail,
    assistantDataLoading,
    menu,
    setMenu,
    handleNewAssistantClick,
  };
};
