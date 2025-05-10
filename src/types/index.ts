export type UserRole = 'buyer' | 'seller';

export type Condition = 'Good' | 'Average' | 'Recently Used' | 'With Tags' | 'Without Tags';

export type Gender = 'Men' | 'Women';

export type Category = 
  | 'T-shirts' 
  | 'Shirts' 
  | 'Pants' 
  | 'Tops' 
  | 'One-pieces' 
  | 'Sarees' 
  | 'Other';

export type Product = {
  id: string;
  title: string;
  description: string;
  category: Category;
  gender: Gender;
  size: string;
  price: number;
  condition: Condition;
  seller_id: string;
  seller_phone: string;
  images: string[];
  created_at: string;
  sold: boolean;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export type Rating = {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  created_at: string;
};