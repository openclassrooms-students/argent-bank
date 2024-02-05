import { z } from "zod";

export const LoginCredentials = z.object({
  email: z.string(),
  password: z.string(),
});

export const ProfileUpdateCredentials = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const LoginSchema = z.object({
  status: z.number(),
  message: z.string(),
  body: z.object({
    token: z.string(),
  }),
});

export const ProfileSchema = z.object({
  status: z.number(),
  message: z.string(),
  body: z.object({
    createdAt: z.string(),
    email: z.string(),
    firstName: z.string(),
    id: z.string(),
    lastName: z.string(),
    updatedAt: z.string(),
  }),
});
