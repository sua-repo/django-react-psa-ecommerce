import { getProducts, getProductsPaging } from "@/api/ProductApi";
import { createContext, useContext, useEffect, useState } from "react";


const ShopContext = createContext();

export const useShop = () => useContext(ShopContext)

export const ShopProvider = ( {children} ) => {

    
    // 정렬, 페이징, 카테고리 분류된 상품들
    const [products, setProducts] = useState([])
    // 검색 관련
    const [search, setSearch] = useState("")
    // 정렬 관련
    const [ordering, setOrdering] = useState("")
    // 카테고리 분류
    const [category, setCategory] = useState("")
    // paging 관련
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    // min, max 필터링
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);     // max 값을 0으로 하면 안 됨

    // 상품 목록 호출
    const fetchProducts = async () => {
        try {
            const response = await getProductsPaging({
                page : currentPage,
                search, // ES6 이후 버전에서는 key와 value 이름이 같으면 하나만 쓸 수 있다.
                ordering,
                category,
                min_price : minPrice,
                max_price : maxPrice,
            })

            console.log(response.data);
            setProducts(response.data.results);
            setTotalCount(response.data.count);
        }   
        catch (error) {
            console.error("", error)
        }
    }

    // 조건이 변경될 때마다 API 다시 호출
    useEffect( () => {
        fetchProducts()
    }, [currentPage, search, ordering, category, minPrice, maxPrice] )

    const value = {
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        totalCount,
        products,
        setProducts,
        ordering,
        setOrdering,
        category,
        setCategory,
        setMinPrice,
        setMaxPrice

    }

    return <ShopContext.Provider value = {value}>{children}</ShopContext.Provider>
}