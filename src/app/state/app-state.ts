import { UserProfile } from "../models/user-profile.model";

export interface AppState {
    searchTerm: string;
    loading: boolean;
    usersProfile: UserProfile[];
    totalCount: number;
    pageIndex: number;
}