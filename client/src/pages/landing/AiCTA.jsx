// import qrPhoneAlberto from "../../assets/qrPhoneAlberto.png";
import qrPhoneTello from "../../assets/qrPhoneTello.png";

export default function AiCTA() {
  return (
    <div className="flex flex-col items-center gap-6 bg-blue px-8 py-10 text-center text-darkWhite md:px-24 lg:px-32">
      <h2 className="font-serif text-4xl font-semibold">Llama para reservar</h2>
      <p className="hidden md:block">
        Escanea este código QR para hacer una reservación por medio de una
        llamada con nuestro asistente inteligente.
      </p>
      <p className="block md:hidden">
        Presiona el botón para hacer una reservación por medio de una llamada
        con nuestro asistente inteligente.
      </p>
      <img src={qrPhoneTello} alt="" className="hidden max-w-80 md:block" />
      <button className="block rounded border border-darkWhite px-4 py-2 text-darkWhite md:hidden">
        <a href="tel:+528119001483">Llama ahora</a>
      </button>
    </div>
  );
}
