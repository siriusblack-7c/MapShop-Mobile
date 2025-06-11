export interface Store {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  products: Product[];
  owner: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  type: 'beef' | 'fish' | 'other';
  description: string;
}

export interface User {
  id: string;
  type: 'seller' | 'buyer';
  name: string;
  email: string;
  location?: {
    latitude: number;
    longitude: number;
  };
} 