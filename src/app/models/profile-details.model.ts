import { Profile } from "./profile.model";

export interface ProfileDetails extends Profile {
    type: string;
    name: string;
    email: string;
    twitter_username: string;
    followers: number;
    following: number;
    bio: string;
}
