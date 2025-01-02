export interface Representative {
  name: string;
  party: string;
  phone: string;
  email: string;
  constituency?: string;
  ward?: string;
}

export interface Representatives {
  mla: Representative;
  mp: Representative;
  corporators: Representative[];
}