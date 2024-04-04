import ButtonFilled from "../../components/ButtonFilled";
import ButtonEmpty from "../../components/ButtonEmpty";

export default function Hero() {
  return (
    <div className="flex bg-darkWhite">
      <div className="w-7/12 bg-blue">
        <img
          src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
          alt=""
        />
      </div>
      <div className="flex w-5/12 flex-col gap-6 px-16">
        <h2 className="font-serif text-4xl font-medium">
          Atrévete a soñar con el
        </h2>
        <h1 className="font-serif text-8xl text-blue">D.R.E.A.M. Lab</h1>
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
