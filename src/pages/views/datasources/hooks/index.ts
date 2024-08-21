import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataFetch } from "hooks";

export interface DataSource {
  id: string;
  name: string;
  description: string;
  type: number;
  // Add more fields as necessary
}

export const useDataSourceData = (id?: string) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleNewDataSourceClick = () => navigate("add");

  const { data: dataSources, isLoading } = useDataFetch<{
    totalCount: string;
    items?: DataSource[];
  }>({
    endpoint: "/api/app/data-source",
    queryKey: "get-all-data-sources",
    method: "getSilent",
    enabled: !id,
  });

  const { data: dataSourceDetail, isLoading: dataSourceDataLoading } = useDataFetch<{
    message: string;
    data?: { [key: string]: any };
  }>({
    endpoint: `/api/app/data-source/${id}`,
    queryKey: "get-one-data-source",
    method: "getSilent",
    enabled: !!id,
  });

  return {
    dataSources,
    isLoading,
    dataSourceDetail,
    dataSourceDataLoading,
    menu,
    setMenu,
    handleNewDataSourceClick,
  };
};
