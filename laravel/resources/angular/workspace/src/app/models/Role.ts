export interface Role {
	id: number;
	name: string;
}

export enum RoleEnum {
	ADMINISTRATEUR = 100,
	VISITEUR = 50,
	BANNI = 10
}