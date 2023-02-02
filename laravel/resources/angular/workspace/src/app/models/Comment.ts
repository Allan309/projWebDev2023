import { User } from "./User";

export interface Comment {
	id: number;
	text: string;
	user_id: number;
	user: User;
	created_at: Date;
	updated_at: Date;
}