/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export type RequestServiceGet = {
  url: string;
  id: string;
  config?: any;
  params?: any;
  queryParam?: any;
};

type RequestServicePost = {
  url: string;
  id: string;
  body: any;
  config?: any;
  queryToInvalidate?: any;
  params?: any;
  noMessage?: boolean;
  hasCustomMessage?: boolean;
  message?: string;
};

type RequestServicePut<_T, U> = {
  url: string;
  id: string;
  body?: U;
  config?: any;
  params?: any;
  queryParam?: any;
  queryToInvalidate: any;
  hasCustomMessage?: boolean;
  message?: string;
  noMessage?: boolean;
};

type RequestServiceDelete<_T, U> = {
  url: string;
  id: string;
  body?: U;
  config?: any;
  params?: any;
  noMessage?: boolean;
  queryParam?: any;
  queryToInvalidate: any;
};

interface ApiResponse<T> {
  data: T | undefined;
  options: {
    error: Error | null;
    isError: boolean;
    refetch: <TPageData>(
      options?: RefetchOptions & RefetchQueryFilters<TPageData>
    ) => Promise<QueryObserverResult<T, Error | null>>;
    isLoading: boolean;
    emptyState: boolean;
    isFetching: boolean;
  };
}

interface ApiResponseMutation<T> {
  data: T | undefined;
  options: {
    error: Error | null;
    isError: boolean;
    isLoading: boolean;
    status: 'idle' | 'loading' | 'error' | 'success';
  };
}

const routesForPublic = ['/login', '/admission'];
const routeBreak = window.location.pathname.split('/');
const routeActive = `/${routeBreak[1]}`;

function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

const getData = async <T>(url: string, params: object): Promise<T> => {
  const token = localStorage.getItem('auth');

  let setParams = {
    ...params,
  };

  if (!routesForPublic.includes(routeActive)) {
    setParams = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios
    .get<T>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...setParams,
      },
    })
    .then((res) => {
      console.log(res.data);

      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

  return response;
};

const postData = async <T, U>(
  url: string,
  params: object,
  body: U
): Promise<T> => {
  const token = localStorage.getItem('auth');

  let setParams = {
    ...params,
  };

  if (!routesForPublic.includes(routeActive)) {
    setParams = {
      Authorization: `Bearer ${token}`,
      ...params,
    };
  }

  const response = await axios
    .post<T>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...setParams,
      },
    })
    .then((res) => {
      console.log(res.data);

      return res.data;
    })
    .catch((error) => {
      console.log(error);

      throw error;
    });

  return response;
};

const putData = async <T, U>(
  url: string,
  params: object,
  body: U
): Promise<T> => {
  const token = localStorage.getItem('auth');

  let setParams = {
    ...params,
  };

  if (!routesForPublic.includes(routeActive)) {
    setParams = {
      Authorization: `Bearer ${token}`,
      ...params,
    };
  }

  const response = await axios
    .put<T>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...setParams,
      },
    })
    .then((res) => {
      console.log(res.data);

      return res.data;
    })
    .catch((error) => {
      console.log(error);

      throw error;
    });

  return response;
};

const deleteData = async <T, U>(
  url: string,
  params: object,
  body?: U
): Promise<T> => {
  const token = localStorage.getItem('auth');

  let setParams = {
    ...params,
  };

  if (!routesForPublic.includes(routeActive)) {
    setParams = {
      Authorization: `Bearer ${token}`,
      ...params,
    };
  }

  const response = await axios
    .delete<T>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...setParams,
      },
      data: body ?? {},
    })
    .then((res) => {
      console.log(res.data);

      return res.data;
    })
    .catch((error) => {
      console.log(error);

      throw error;
    });

  return response;
};

const REQUEST_SERVICE = {
  GET: <T>({
    url,
    id,
    config,
    params,
    queryParam,
  }: RequestServiceGet): ApiResponse<T> => {
    const {
      data,
      error,
      isError,
      refetch,
      isLoading,
      isFetching,
    } = useQuery<T, Error>({
      queryKey: [id, queryParam],
      queryFn: () => getData(url, params),
      ...config,
    });

    let emptyState = false;
    if (data && isObject(data)) {
      const dataObj = data as Record<string, any>;
      emptyState = 'items' in dataObj ? dataObj.items?.length === 0 : false;
    }

    return {
      data,
      options: {
        error,
        isError,
        refetch,
        isLoading,
        emptyState,
        isFetching,
      },
    };
  },
  POST: <T>({
    url,
    id,
    config,
    params,
    queryToInvalidate,
    body,
  }: RequestServicePost): ApiResponseMutation<T> & {
    mutate: () => void;
    isSuccess: boolean;
  } => {
    const queryConfig = config ?? { enabled: false };
    const queryClient = useQueryClient();

    const mutation = useMutation<T, Error>({
      mutationKey: [id],
      mutationFn: () => postData(url, params, body),
      onSuccess: () => {  
        queryClient.invalidateQueries({
          queryKey: queryToInvalidate,
        });
      },
      ...queryConfig,
    });

    return {
      data: mutation.data,
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      options: {
        error: mutation.error,
        isError: mutation.isError,
        isLoading: mutation.isLoading,
        status: mutation.status,
      },
    };
  },
  PUT: <T, U>({
    url,
    id,
    config,
    params,
    body,
    queryParam,
    queryToInvalidate,
  }: RequestServicePut<T, U>): ApiResponseMutation<T> & {
    mutate: () => void;
    isSuccess: boolean;
  } => {
    const queryConfig = config ?? { enabled: false };
    const queryClient = useQueryClient();

    const mutation = useMutation<T, Error>({
      mutationKey: [id, queryParam],
      mutationFn: () => putData<T, U>(url, params, body!),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryToInvalidate,
        });
      },
      ...queryConfig,
    });

    return {
      data: mutation.data,
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      options: {
        error: mutation.error,
        isError: mutation.isError,
        isLoading: mutation.isLoading,
        status: mutation.status,
      },
    };
  },
  DELETE: <T, U>({
    url,
    id,
    config,
    params,
    queryParam,
    queryToInvalidate,
    body,
  }: RequestServiceDelete<T, U>): ApiResponseMutation<T> & {
    mutate: () => void;
    isSuccess: boolean;
  } => {
    const queryConfig = config ?? { enabled: false };
    const queryClient = useQueryClient();

    const mutation = useMutation<T, Error>({
      mutationKey: [id, queryParam],
      mutationFn: () => deleteData<T, U>(url, params, body!),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryToInvalidate,
        });
      },
      ...queryConfig,
    });

    return {
      data: mutation.data,
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      options: {
        error: mutation.error,
        isError: mutation.isError,
        isLoading: mutation.isLoading,
        status: mutation.status,
      },
    };
  },
};

export default REQUEST_SERVICE;
