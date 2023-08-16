import FarbenController from "./controllers/farben"
import AuftragsController from "./controllers/auftraege"
import KundenstammController from "./controllers/kundenstamm"
import ModellstammController from "./controllers/modellstamm"

import { Controller } from "../types/controllerType"

export default <Controller> {
    "farben" : FarbenController,
    "auftraege": AuftragsController,
    "modellstamm": ModellstammController,
    "kundenstamm": KundenstammController
}