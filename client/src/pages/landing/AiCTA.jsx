// import qrPhoneAlberto from "../../assets/qrPhoneAlberto.png";
import qrPhoneTello from "../../assets/qrPhoneTello.png";

export default function AiCTA() {
  return (
    <div className="flex flex-col items-center bg-violet px-16 py-4 text-center text-darkWhite ">
      <h2 className="font-serif text-4xl font-semibold mb-14">¡Intenta reservar mediante una llamada!</h2>
      
      <img src={qrPhoneTello} alt="" className="hidden max-w-64 md:block" />
      <button className="block rounded border border-darkWhite px-4 py-2 text-darkWhite md:hidden">
        <a href="tel:+528119001483">Llama ahora</a>
      </button>
    </div>
  );
}
