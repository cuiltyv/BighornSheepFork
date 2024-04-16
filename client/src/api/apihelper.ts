import axios from "./axios";
import { User } from "@interfaces";

export async function getUser(matricula: string): Promise<User | null> {
  try {
    const response = await axios.get("/perfil/" + matricula);
    if (response.status === 200) {
      const data = response.data;
      const user: User = {
        matricula: data.Matricula,
        nombre: data.Nombre,
        apellidos: data.Apellidos,
        contrasena: data.Contrasena,
        carrera: data.Carrera,
        semestre: data.Semestre,
      };
      return user;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}