import z from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  thumbnail: z.string(),
  discountPercentage: z.number(),
  tags: z.array(z.string()),
  rating: z.number(),
});

export const ProductsResponseSchema = z.object({
  limit: z.number(),
  products: z.array(ProductSchema),
  skip: z.number(),
  total: z.number(),
});

export const RegistrationSchema = z
  .object({
    login: z.string().min(4, 'Minimum 4 symbols').max(20, 'Maximum 20 symbols'),
    email: z.email('Invalid email format').max(50),
    phone: z.string().min(14, 'Minimum 14 symbols').max(20, 'Maximum 20 symbols'),
    password: z.string().min(6, 'Minimum 6 symbols').max(24, 'Minimum 24 symbols'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords are not identical',
    path: ['repeatPassword'],
  });

export const UserScheme = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginResponseScheme = z.object({
  accessToken: z.string(),
  id: z.number(),
  username: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export type RegistrationForm = z.infer<typeof RegistrationSchema>;

export type User = z.infer<typeof UserScheme>;
export type LoginResponse = z.infer<typeof LoginResponseScheme>;
