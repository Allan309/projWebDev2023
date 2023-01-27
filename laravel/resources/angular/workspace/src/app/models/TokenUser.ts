import { User } from './User';

export interface TokenUser {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: User;
}