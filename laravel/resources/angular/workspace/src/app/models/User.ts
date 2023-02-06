import { Role } from "./Role";

export interface User {
	id: number;
	pseudo: string;
	email: string;
	nom: string;
	prenom: string;
	nationalite: string;
	adresse: string;
	tel: string;
	date_naissance: Date;
	url_image: string;
	role_id: number;
	role: Role;
	created_at: Date;
	updated_at: Date;
}