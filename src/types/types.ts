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

export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProps {
  open: boolean;
  onClose: () => void;
  product: IProduct;
}

export interface ICart {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface IProductCategories {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProductCardProps {
  product: IProduct;
}
