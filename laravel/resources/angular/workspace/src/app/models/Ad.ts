import { User } from "./User";

export interface Ad {
	id: number;
	description: string;
	url_image: string;
	puissance: number;
	annee: number;
	marque: string;
	modele: string;
	user_id: number;
	user: User;
	comments?: Comment[]; 
	prix: number;
	created_at: Date;
	updated_at: Date;
}