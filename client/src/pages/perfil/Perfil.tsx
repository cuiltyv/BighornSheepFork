import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { User } from "@interfaces";
import { getUser } from "@api_helper";
import useAuth from "@UserAuth";

export default function TabsDemo() {
  // @ts-expect-error //ignore warning
  const { auth } = useAuth();
  const userID = auth?.userID;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;
      const result = await getUser(userID);
      setUser(result);
    };
    fetchUser();
  }, [userID]);

  return (
    <div className="flex justify-center w-screen pb-20 h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Cuenta</TabsTrigger>
          <TabsTrigger value="password">Contraseña</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Bienvenido {user?.nombre ?? "Loading.."}</CardTitle>
              <CardDescription>Modifica o consulta tu información de perfil aqui</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Replaced static content with dynamic user state content */}
              <div className="space-y-1">
                <Label htmlFor="nombre">Nombre(s)</Label>
                <Input id="nombre" defaultValue={user?.nombre ?? ""} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="apellidos">Apellido(s)</Label>
                <Input id="apellidos" defaultValue={user?.apellidos ?? ""} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="matricula">Matricula</Label>
                <Input disabled id="matricula" defaultValue={user?.matricula ?? ""} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="carrera">Carrera</Label>
                <Input id="carrera" defaultValue={user?.carrera ?? ""} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Contraseña</CardTitle>
              <CardDescription>
                Cambia tu contraseña aqui. Despues de guardarlo cerraremos tu sesión .
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">

              <div className="space-y-1">
                <Label htmlFor="current">Contraseña Actual</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Nueva Contraseña password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}






// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { User } from "@interfaces"

// import { getUser } from "@api_helper"

// import { useEffect, useState } from 'react';

// import useAuth from "@UserAuth";

// export function CardWithForm() {
//   // Inside your component

//   // @ts-expect-error //ignore warning
//   const {auth} = useAuth(); 
//   const userID = auth?.userID;


//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!userID) return;
//       const result = await getUser(userID);
//       setUser(result);
//     };
//     fetchUser();
//   }, [userID]); // Empty dependency array means this effect runs once on mount


//   return (
//     <div className="flex justify-center w-screen pb-20">
//       <Card className="w-[350px] min-h">
//         <CardHeader>
//           <CardTitle>Bienvenido {user?.nombre ?? "Loading.."}</CardTitle>
//           <CardDescription>Modifica o consulta la información de tu perfil</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="grid w-full items-center gap-4">
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="nombre">Nombre</Label>
//                 <Input id="nombre" placeholder={user?.nombre ?? "Loading.."} />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="apellidos">Apellido(s)</Label>
//                 <Input id="apellidos" placeholder={user?.apellidos ?? "Loading.."} />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="matricula">Matricula</Label>
//                 <Input id="matricula" placeholder={user?.matricula ?? "Loading.."} />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="contrasena">Password</Label>
//                 <Input id="contrasena" placeholder={user?.contrasena ?? "Loading.."} />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="carrera">Carrera</Label>
//                 <Input id="carrera" placeholder={user?.carrera ?? "Loading.."} />
//               </div>

//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline">Cancelar</Button>
//           <Button>Guardar</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default CardWithForm;
