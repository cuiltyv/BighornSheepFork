import { Title, Container, Accordion, ThemeIcon, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./Faq.module.css";

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

const Faqq = () => {
  return (
    <div className={classes.wrapper}>
      <Container size="sm">
        <div className="pb-10">
          <Title ta="center" className={classes.title}>
            Frequently Asked Questions
          </Title>
        </div>
        <Accordion
          chevronPosition="right"
          defaultValue="reset-password"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
          styles={{
            label: { color: "var(--mantine-color-black)" },
            item: { border: 0 },
          }}
          chevron={
            <ThemeIcon
              radius="xl"
              className={classes.gradient}
              size={26}
              style={{ backgroundColor: "#654F6F", color: "#fff" }}
            >
              <IconPlus
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ThemeIcon>
          }
        >
          <Accordion.Item className={classes.item} value="q1">
            <Accordion.Control>
              ¿Quiénes pueden hacer reservaciones en el Laboratorio D.R.E.A.M?
            </Accordion.Control>
            <Accordion.Panel>
              Los estudiantes y profesores de la avenida de Ingeniería en
              Tecnologías de la Información del Tecnológico de Monterrey pueden
              reservar equipos y espacios especializados para sus proyectos de
              investigación y desarrollo, así como para actividades de sus
              unidades de formación.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="q2">
            <Accordion.Control>
              ¿Cómo puedo reservar un espacio o equipo en el laboratorio?
            </Accordion.Control>
            <Accordion.Panel>
              Para hacer una reservación, visita la página de inicio y dirígete
              a la sección de reservaciones Asegúrate de iniciar sesión con tu
              cuenta institucional.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="q3">
            <Accordion.Control>
              ¿Cuánto tiempo antes necesito hacer una reservación?
            </Accordion.Control>
            <Accordion.Panel>
              Recomendamos hacer las reservaciones con al menos 24 horas de
              anticipación para asegurar la disponibilidad del espacio o equipo
              deseado.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="q4">
            <Accordion.Control>
              ¿Hay un límite de tiempo para el uso de las instalaciones?
            </Accordion.Control>
            <Accordion.Panel>
              Sí, el tiempo máximo de uso es de 4 horas consecutivas por día,
              aunque esto puede variar según la demanda y la disponibilidad.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="q5">
            <Accordion.Control>
              ¿Qué tipo de equipos y espacios están disponibles para reservar?
            </Accordion.Control>
            <Accordion.Panel>
              El laboratorio ofrece una variedad de equipos y espacios,
              incluyendo estaciones de trabajo para realidad virtual,
              computadoras de alto rendimiento y áreas específicas para
              proyectos de computación avanzada y modelado.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item className={classes.item} value="q6">
            <Accordion.Control>
              ¿Qué ocurre si necesito cancelar o modificar mi reservación?
            </Accordion.Control>
            <Accordion.Panel>
              Puedes modificar o cancelar tu reservación a través del sistema de
              reservaciones en línea hasta 12 horas antes de tu horario
              reservado.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item className={classes.item} value="q7">
            <Accordion.Control>
              ¿Existen recursos disponibles para asistencia durante el uso del
              laboratorio?
            </Accordion.Control>
            <Accordion.Panel>
              Sí, contamos con personal técnico especializado disponible para
              asistir en el uso de los equipos y facilidades durante el horario
              de operación del laboratorio.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default Faqq;
