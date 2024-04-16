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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  matricula: string;
  nombre: string;
  apellidos: string;
  contrasena: string;
  carrera: string;
  semestre: number;
}

const defaultUser: User = {
  matricula: "defaultMatricula",
  nombre: "defaultNombre",
  apellidos: "defaultApellidos",
  contrasena: "defaultContrasena",
  carrera: "defaultCarrera",
  semestre: -1,
};


export function CardWithForm() {
  return (
    <div className="flex justify-center w-screen pb-20">
    <Card className="w-[350px] min-h">
      <CardHeader>
        <CardTitle>Bienvenido {defaultUser.nombre}</CardTitle>
        <CardDescription>Modifica o consulta la información de tu perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Nombre</Label>
              <Input id="name" placeholder={defaultUser.nombre} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Apellido(s)</Label>
              <Input id="name" placeholder={defaultUser.apellidos} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Matricula</Label>
              <Input id="name" placeholder={defaultUser.matricula} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="name" placeholder={defaultUser.contrasena} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Carrera</Label>
              <Input id="name" placeholder={defaultUser.carrera} />
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
