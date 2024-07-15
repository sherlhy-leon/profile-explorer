import { UserResponse } from "../../app/models/users-response.model";
import { PROFILES_MOCK } from "./profiles";

export const RESPONSE_API_MOCK: UserResponse = {
    total_count: 4,
    incomplete_results: false,
    items: PROFILES_MOCK
}