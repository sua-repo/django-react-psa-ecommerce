import http from './HttpCommon';

export const getCategories = () => {
    return http.get('/api/categories/')
}

