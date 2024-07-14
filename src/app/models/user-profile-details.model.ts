import { UserProfile } from "./user-profile.model";

export interface UserProfileDetails extends UserProfile {
    type: string;
    name: string;
    email: string;
    twitter_username: string;
    followers: number;
    following: number
}
