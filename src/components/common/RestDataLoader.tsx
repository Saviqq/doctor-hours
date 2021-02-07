import React from "react";
import { RestResponse } from "../../dto/common";
import useAsync from "./hooks/useAsync";

import Spinner from "./Spinner";
import "./style.css";

interface RestDataLoaderProps<DATA> {
  children: (data: DATA) => React.ReactNode;
  promiseGetter: () => Promise<RestResponse<DATA>>;
}
export default function RestDataLoader<DATA>({
  children,
  promiseGetter,
}: RestDataLoaderProps<DATA>): JSX.Element {
  const { isLoading, data } = useAsync(promiseGetter);

  return isLoading ? <Spinner /> : <>{data ? children(data) : "error"}</>;
}
