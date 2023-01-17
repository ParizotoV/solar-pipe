import axios from 'axios';
import { AxiosError } from 'axios';

import { getAPIClient } from './axios';

export type DataServiceProps = {
  ctx?: any;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  data?: any;
  url: string;
  token?: any;
};

export const DataService = async({
  ctx = null,
  method = 'POST',
  data,
  url,
  token = null,
}: DataServiceProps): Promise<any> => {
  const client = getAPIClient(ctx);

  try {
    const response = await client({
      data,
      method,
      url,
    });

    if (response.data?.token && url === '/authentication/login') {
      client.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    }

    return response;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (axios.isAxiosError(errors) && errors.response) {
      return {
        data: { },
        error: true,
        message: errors.response.data?.message,
        statusCode: errors.response.data?.statusCode,
      };
    }
  }
};
