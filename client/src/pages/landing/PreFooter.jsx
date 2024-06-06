import Contacto from "@/components/Contacto";
import AiCTA from "./AiCTA";


export default function PreFooter() {
    return(
    <div className="bg-violet flex flex-col-reverse lg:flex-row p-6 align-middle justify-center">
        <Contacto />
        <AiCTA />
    </div>
    )
}