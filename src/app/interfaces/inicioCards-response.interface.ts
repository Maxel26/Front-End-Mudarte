import { InicioCards } from "./inicioCards.interface";

export interface inicioCardResponse{
    ok: boolean;
    path?: string;
    msg?: string;
    cards: InicioCards[];
}