import axios, { AxiosError } from 'axios';

import { getAPIClient } from './axios';
import { DataServiceProps } from './DataService.interface';

export const DataService = async ({
  context = null,
  method = 'POST',
  data,
  url,
}: DataServiceProps): Promise<any> => {
  const client = getAPIClient(context);

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
        data: {},
        error: true,
        message: errors.response.data?.message,
        statusCode: errors.response.data?.statusCode,
      };
    }
  }
};
