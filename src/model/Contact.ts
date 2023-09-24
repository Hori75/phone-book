import { Phone } from "./Phone";

export interface Contact {
    created_at: string,
    first_name: string,
    id: number,
    last_name: string,
    favorite: boolean,
    phones: Phone[],
};
