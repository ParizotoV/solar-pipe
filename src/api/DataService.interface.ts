export type DataServiceProps = {
  context?: any;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  data?: any;
  url: string;
};