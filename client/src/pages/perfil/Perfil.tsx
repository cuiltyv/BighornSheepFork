import { useFormik } from "formik";
import * as Yup from "yup";

export default function Perfil() {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      matricula: "",
      password: "",
      passwordConfirm: "",
      carrera: "",
      semestre: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo requerido"),
      apellido: Yup.string().required("Campo requerido"),
      email: Yup.string().email("Email inválido").required("Campo requerido"),
      matricula: Yup.string().required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Campo requerido"),
      carrera: Yup.string().required("Campo requerido"),
      semestre: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-semibold">Perfil</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nombre}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.nombre && formik.errors.nombre ? (
          <div className="text-sm text-red-600">{formik.errors.nombre}</div>
        ) : null}

        <label
          htmlFor="apellido"
          className="block text-sm font-medium text-gray-700"
        >
          Apellido
        </label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.apellido}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.apellido && formik.errors.apellido ? (
          <div className="text-sm text-red-600">{formik.errors.apellido}</div>
        ) : null}

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-sm text-red-600">{formik.errors.email}</div>
        ) : null}

        <label
          htmlFor="matricula"
          className="block text-sm font-medium text-gray-700"
        >
          Matricula
        </label>
        <input
          id="matricula"
          name="matricula"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.matricula}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.matricula && formik.errors.matricula ? (
          <div className="text-sm text-red-600">{formik.errors.matricula}</div>
        ) : null}

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-sm text-red-600">{formik.errors.password}</div>
        ) : null}

        <label
          htmlFor="passwordConfirm"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmar Password
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirm}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <div className="text-sm text-red-600">
            {formik.errors.passwordConfirm}
          </div>
        ) : null}

        <label
          htmlFor="carrera"
          className="block text-sm font-medium text-gray-700"
        >
          Carrera
        </label>
        <input
          id="carrera"
          name="carrera"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carrera}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.carrera && formik.errors.carrera ? (
          <div className="text-sm text-red-600">{formik.errors.carrera}</div>
        ) : null}

        <label
          htmlFor="semestre"
          className="block text-sm font-medium text-gray-700"
        >
          Semestre
        </label>
        <input
          id="semestre"
          name="semestre"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.semestre}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {formik.touched.semestre && formik.errors.semestre ? (
          <div className="text-sm text-red-600">{formik.errors.semestre}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
