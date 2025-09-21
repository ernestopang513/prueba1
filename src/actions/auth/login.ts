import { UserLogin } from "../../domain/entities/auth";
import { AuthResponse } from "../../infrastructure/interfaces/auth.response";
import { api } from "../../main/shared/helpers/api";


export const authLogin = async ({ username, password }: UserLogin) => {
  try {
    const { data } = await api.post<AuthResponse>("/login", {
      username,
      password
    });
    // console.log(data);
    return data;

  } catch (error) {
    console.log(error)
    // return undefined;
    throw error
  }
}