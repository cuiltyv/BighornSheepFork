import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  matricula: string;
  nombre: string;
  apellidos: string;
  contrasena: string;
  carrera: string;
  semestre: number;
}


function syncProfile() {
  const user:User = {
    matricula: "defaultMatricula",
    nombre: "defaultNombre",
    apellidos: "defaultApellidos",
    contrasena: "defaultContrasena",
    carrera: "defaultCarrera",
    semestre: -1,
  };
  return user
}





export function CardWithForm() {
  const user = syncProfile();
  return (
    <div className="flex justify-center w-screen pb-20">
    <Card className="w-[350px] min-h">
      <CardHeader>
        <CardTitle>Bienvenido {user.nombre}</CardTitle>
        <CardDescription>Modifica o consulta la información de tu perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Nombre</Label>
              <Input id="name" placeholder={user.nombre} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Apellido(s)</Label>
              <Input id="name" placeholder={user.apellidos} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Matricula</Label>
              <Input id="name" placeholder={user.matricula} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="name" placeholder={user.contrasena} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Carrera</Label>
              <Input id="name" placeholder={user.carrera} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default CardWithForm;
