import { UserProfile } from "./user-profile.model";

export interface UserProfileDetails extends UserProfile {
    avatar_url: string;
    type: string;
    name: string;
    email: string;
    twitter_username: string;
    followers: number;
    following: number
}
