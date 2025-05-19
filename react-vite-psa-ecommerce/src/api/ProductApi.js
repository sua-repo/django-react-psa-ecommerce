import http from './HttpCommon';

//dev_4_fruits
// # http://127.0.0.1:8000/api/products/
// # 방식   url                 기능
// # GET  products/            list
// # POST products/            create
// # Get  product/{id}         product
// # PUT  product/{id}       modify product
// # DELETE  product/{id}    delete product
export const getProducts = () => {
    return http.get('/api/products/')
}

export const getProductsPaging = ({
    page = 1,
    search = "",
    ordering = "",
    category = "",
    min_price = 0,
    max_price = null,
    page_size = 12
}) => {
    
    const params = {
        page,   // page : page
        search,  // search : search
        ordering,
        category,
        page_size,   // page_size : page_size
    }

    if (min_price != null) 
        params.min_price = min_price

    if (max_price != null) 
        params.max_price = max_price

    
    // /api/product-list/?page=1&search=검색어
    return http.get("/api/product-list/",{params})
}

export const getProductMaxPrice = () => {
    return http.get(`/api/product-list/max-price/`)
}