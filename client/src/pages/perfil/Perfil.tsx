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

export function CardWithForm() {
  return (
    <div className="flex justify-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default CardWithForm;


// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function Perfil() {
//   const formik = useFormik({
//     initialValues: {
//       nombre: "Roberto",
//       apellido: "Andonie",
//       email: "a01411863@tec.mx",
//       matricula: "A01411863",
//       password: "Shakira123",
//       passwordConfirm: "Shakira123",
//       carrera: "ITC",
//       semestre: "6to Semestre",
//     },
//     validationSchema: Yup.object({
//       nombre: Yup.string().required("Campo requerido"),
//       apellido: Yup.string().required("Campo requerido"),
//       email: Yup.string().email("Email inválido").required("Campo requerido"),
//       matricula: Yup.string().required("Campo requerido"),
//       password: Yup.string().required("Campo requerido"),
//       passwordConfirm: Yup.string()
//         .nullable()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Campo requerido"),
//       carrera: Yup.string().required("Campo requerido"),
//       semestre: Yup.string().required("Campo requerido"),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   return (
//     <div className="mx-auto max-w-lg p-8">
//       <h1 className="mb-6 text-2xl font-semibold">Perfil</h1>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <label
//           htmlFor="nombre"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Nombre
//         </label>
//         <input
//           id="nombre"
//           name="nombre"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.nombre}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.nombre && formik.errors.nombre ? (
//           <div className="text-sm text-red-600">{formik.errors.nombre}</div>
//         ) : null}

//         <label
//           htmlFor="apellido"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Apellido
//         </label>
//         <input
//           id="apellido"
//           name="apellido"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.apellido}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.apellido && formik.errors.apellido ? (
//           <div className="text-sm text-red-600">{formik.errors.apellido}</div>
//         ) : null}

//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Email
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.email && formik.errors.email ? (
//           <div className="text-sm text-red-600">{formik.errors.email}</div>
//         ) : null}

//         <label
//           htmlFor="matricula"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Matricula
//         </label>
//         <input
//           id="matricula"
//           name="matricula"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.matricula}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.matricula && formik.errors.matricula ? (
//           <div className="text-sm text-red-600">{formik.errors.matricula}</div>
//         ) : null}

//         <label
//           htmlFor="password"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Password
//         </label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.password && formik.errors.password ? (
//           <div className="text-sm text-red-600">{formik.errors.password}</div>
//         ) : null}

//         <label
//           htmlFor="passwordConfirm"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Confirmar Password
//         </label>
//         <input
//           id="passwordConfirm"
//           name="passwordConfirm"
//           type="password"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.passwordConfirm}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
//           <div className="text-sm text-red-600">
//             {formik.errors.passwordConfirm}
//           </div>
//         ) : null}

//         <label
//           htmlFor="carrera"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Carrera
//         </label>
//         <input
//           id="carrera"
//           name="carrera"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.carrera}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.carrera && formik.errors.carrera ? (
//           <div className="text-sm text-red-600">{formik.errors.carrera}</div>
//         ) : null}

//         <label
//           htmlFor="semestre"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Semestre
//         </label>
//         <input
//           id="semestre"
//           name="semestre"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.semestre}
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//         />
//         {formik.touched.semestre && formik.errors.semestre ? (
//           <div className="text-sm text-red-600">{formik.errors.semestre}</div>
//         ) : null}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
