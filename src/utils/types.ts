import z from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  thumbnail: z.string(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedTotal: z.number(),
  tags: z.array(z.string()),
  rating: z.number(),
});

export const RegistrationSchema = z.object({
  login: z.string().min(5),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type RegistrationForm = z.infer<typeof RegistrationSchema>;
