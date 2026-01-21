export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  tags: string[];
  rating: number;
}

export interface ICart {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface IUser {
  username: string;
  password: string;
}
