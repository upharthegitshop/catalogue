export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  costPrice: number;
  sellingPrice: number;
}

export interface AdminCredentials {
  email: string;
  password: string;
}
