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

export interface IIRegistrationForm {
  login: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
}
