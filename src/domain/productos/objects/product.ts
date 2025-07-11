
export interface Product {
  stock: number;
  category: string;
  status: string;
  id: string;
  name: string;
  price: number;
  description: string;
  /** Fecha de creación en formato ISO */
  createdAt: string;
}
