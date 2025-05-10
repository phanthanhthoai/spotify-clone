export function buildPaginationParam(queryParam) {
    return `page=${queryParam.page}&size=${queryParam.size}`;
}