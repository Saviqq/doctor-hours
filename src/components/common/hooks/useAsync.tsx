import { useEffect, useState } from "react";
import { RestResponse } from "../../../dto/common";

export default function useAsync<DATA>(
  promise: () => Promise<RestResponse<DATA>>
): { isLoading: boolean; data?: DATA } {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DATA>();

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const result = await promise();
      setData(result.response);
      setIsLoading(false);
    }

    fetch();
  }, [promise]);

  return { isLoading, data };
}
