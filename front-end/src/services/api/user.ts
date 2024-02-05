import { string, z } from "zod";
import {
  LoginCredentials,
  LoginSchema,
  ProfileSchema,
  ProfileUpdateCredentials,
} from "../../schema/User";

const API_URL = "http://localhost:3001/api/v1/user/";

const apiFetch = async <T>(
  url: string,
  options: RequestInit,
  schema: z.ZodSchema<T>
): Promise<T> => {
  try {
    const response = await fetch(API_URL + url, options);
    const data = await response.json();

    if (!response.ok)
      throw data.message
        ? data.message
        : "An error occurred while fetching data";

    const decodedData = schema.safeParse(data);

    if (!decodedData.success) {
      throw decodedData.error.message;
    }
    return decodedData.data;
  } catch (error) {
    throw String(error);
  }
};

export const login = async (credentials: z.infer<typeof LoginCredentials>) => {
  const parsedCredentials = LoginCredentials.parse(credentials);

  if (!parsedCredentials) {
    throw "Invalid credentials";
  }

  return await apiFetch(
    "login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedCredentials),
    },
    LoginSchema
  );
};

export const profile = async (token: string) => {
  if (!token) throw new Error("No token found");

  return await apiFetch(
    "profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    },
    ProfileSchema
  );
};

export const updateProfile = async (
  profileUpdateData: z.infer<typeof ProfileUpdateCredentials>,
  token: string
) => {
  const parsedProfileUpdateData =
    ProfileUpdateCredentials.parse(profileUpdateData);

  if (!parsedProfileUpdateData) {
    throw "Invalid profile update data";
  }

  if (!token) throw new Error("No token found");

  return await apiFetch(
    "profile",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsedProfileUpdateData),
    },
    ProfileSchema
  );
};

export const authFetch = {
  login,
  profile,
  updateProfile,
};
