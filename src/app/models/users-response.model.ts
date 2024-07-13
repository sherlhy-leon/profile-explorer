import { UserProfile } from "./user-profile.model";

export interface UserResponse {
    total_count: number;
    incomplete_results: boolean;
    items: UserProfile[]
}