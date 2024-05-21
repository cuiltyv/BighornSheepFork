import React, { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logica
    console.log(formData);
    alert("Mensaje enviado!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet px-4 py-10 md:px-32">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Contactanos</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Mensaje
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-gold px-4 py-2 font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
