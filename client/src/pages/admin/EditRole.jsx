import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import axios from "../../api/axios";

const EDIT_ROLE_URL = "usuarios/updaterole";

const EditRole = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [namedRole, setNamedRole] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    // Set namedRole based on selectedRole
    setNamedRole(selectedRole === "2" ? "Admin" : "User");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let capitalizedStr = user.charAt(0).toUpperCase() + user.slice(1);
    setUser(capitalizedStr);

    try {
      const response = await axios.put(
        JSON.stringify({
          Matricula: user,
          Role: role,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-2 mt-4 rounded-lg bg-white p-4 shadow-xl">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Editar Rol de Usuarios</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Rol de Usuarios</DialogTitle>
            <DialogDescription>
              Realizar los cambios aqui, seleccionar guardar cambios para
              aplicar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Matricula
              </Label>
              <Input
                id="username"
                className="col-span-3"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Role
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="col-span-3 justify-start"
                    variant="outline"
                  >
                    <span className="truncate">
                      {namedRole || "Seleccionar Rol"}
                    </span>
                    <ChevronDownIcon className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                  <DropdownMenuLabel>Roles</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    value="2"
                    onSelect={() => handleRoleChange("2")}
                  >
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    value="1"
                    onSelect={() => handleRoleChange("1")}
                  >
                    User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default EditRole;
