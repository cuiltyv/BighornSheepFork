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
      <div className="lg:w-fit w-full px-6 py-4 bg-violet">
        <h2 className="mb-6 text-4xl font-bold text-white text-center">Contactanos</h2>
        <form onSubmit={handleSubmit} className="">
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Nombre"
              onChange={handleChange}
              className="rounded-md w-full lg:w-[25vw] border  border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full lg:w-[25vw] rounded-md mb-[6px] border border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              id="message"
              placeholder="Mensaje"
              value={formData.message}
              onChange={handleChange}
              className="w-full lg:w-[25vw] rounded-md border border-gray-300 p-2 shadow-sm focus:border-gold focus:ring-gold"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-gold px-4 py-2 font-medium w-full text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
  );
};

export default Contacto;
