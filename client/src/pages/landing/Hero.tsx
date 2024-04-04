import ButtonFilled from "../../components/ButtonFilled";
import ButtonEmpty from "../../components/ButtonEmpty";

export default function Hero() {
  return (
    <div className="flex flex-col bg-darkWhite md:flex-row">
      <div className="flex items-center justify-center bg-blue md:w-7/12">
        <img
          src="https://cdn.labmanager.com/assets/articleNo/2561/iImg/5457/70f4ae1d-74c7-4263-b2ef-3e3f881838c9-dec17-tech-laboftomorrow-640x360.jpg"
          alt=""
          className="my- mx-auto"
        />
      </div>
      <div className="flex w-full flex-col gap-6 px-4 md:w-5/12 md:px-16">
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Atrévete a soñar con el
        </h2>
        <h1 className="font-serif text-5xl text-blue md:text-8xl">
          D.R.E.A.M. Lab
        </h1>
        <p className="font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <div className="flex gap-6">
          <ButtonFilled text="Reserva un espacio" />
          <ButtonEmpty text="Crea tu perfil" />
        </div>
      </div>
    </div>
  );
}
