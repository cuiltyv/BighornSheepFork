import axios from "./axios";
import { User } from "../components/interfaces/IUser";
import { Sala } from "../components/interfaces/ISala";

export async function getSalas(): Promise<[]> {
  try {
    const response = await axios.get("salas/");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSala(id: string): Promise<Sala | null> {
  try {
    const response = await axios.get("salas/" + id);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getHardware(): Promise<[]> {
  try {
    const response = await axios.get("hardware/");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUser(matricula: string): Promise<User | null> {
  try {
    const response = await axios.get("usuarios/" + matricula);
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

export async function updateUser(user: User): Promise<boolean> {
  try {
    const response = await axios.put("usuarios/" + user.matricula, user);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
