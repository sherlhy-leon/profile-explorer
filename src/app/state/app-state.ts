import { Profile } from "../models/profile.model";

export interface AppState {
    searchValue: string;
    loading: boolean;
    profiles: Profile[];
    totalCount: number;
    pageIndex: number;
}