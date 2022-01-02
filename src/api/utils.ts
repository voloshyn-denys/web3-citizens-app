export const getCitizensIdsToSearch = (page: number, limit: number, count: number) => {
    const startFrom = count - (limit * page) + 1;
    const citizenIds = Array.from({ length: limit }, (_, index) => index + startFrom);

    return citizenIds.filter(item => item > 0);
}