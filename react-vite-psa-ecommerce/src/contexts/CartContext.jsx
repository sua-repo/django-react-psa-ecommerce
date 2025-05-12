// dev_6_fruits
import { addCart, deleteCart, getCarts, mergeCart } from "@/api/CartApi";
import { useAuth } from "./AuthContext";
import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    // 화면 관리용 변수
    const [cartItems, setCartItems] = useState({});
    const {user} = useAuth();

    // dev_7_fruits
    const [userCart, setUserCart] = useState(null);

    // 비회원일 때 카트를 localStorage에 저장
    // cartItems, user 변수에 변화가 생기면 해당 콜백함수 호출
    useEffect(() => {
        // 비로그인
        if (!user) {
            localStorage.setItem("cart", JSON.stringify(cartItems))
            console.log("🛒 savedCart:", localStorage.getItem("cart"));
        }
    }, [cartItems, user])


    // 로그인 시 카트 병합
    // 병합 순서 : 

    useEffect(() => {
        const fetchCart = async () => {
            // 로그인 되면
            // 로컬에 저장된 카트를 서버로 보내 서버에서 로컬에 저장된 카트를 병합
            if (user) { 
                const guestCart = JSON.parse(localStorage.getItem("cart") || "{}")
                
                try {
                    if (Object.keys(guestCart).length > 0) {
                        await mergeCart(localStorage.getItem("cart"))
                        localStorage.removeItem("cart")
                    }

                    // 병합 작업이 끝난 후 서버에서 카트를 로드함
                    loadCart()
                }
                catch (error) {
                    console.error("장바구니 병합 / 불러오기 실패", error)
                }
            }
        }
        fetchCart();
    }, [user])

    // 장바구니 불러오기
    const loadCart = async () => {
        try {
            const response = await getCarts()
            console.log("카트============")
            console.log(response)

            // 서버 응답 : 배열일 경우 변환
            const cartData = {};
            response.data.cart.forEach((item) => {
                cartData[item.product.id] = {
                quantity: item.quantity,
                price: item.price,
                };
            });
            setCartItems(cartData)

            // dev_7_fruits
            if(user){
                setUserCart(response.data)
            }
        }
        catch (error) {
            console.error("❌ 장바구니 불러오기 실패", error);
        }
    }

    const getTotalItems = () => { 
        // let total = 0; 
        
        // Javascript에서 객체를 만들고 다룰 때 사용하는 기본 클래스 
        // keys, values, entries, assign, hasOwnPropert

        // 예 : const person = { name : "Sua", age : 100 };     // Object 객체

        // 예 :
        // const obj = { a: 1, b: 2, c: 3 };
        // const values = Object.values(obj);
        // console.log(values); // [1, 2, 3]

        // const items = Object.values(cartItems); // 상품 객체들을 배열로 가져옴

        // for (let i = 0; i < items.length; i++) {
        //   total += items[i].quantity; // 각 상품의 수량을 누적
        // }

        // return total;
        return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
    }

    // 장바구니 추가
    const addToCart = async (product, quantity=1) => {
        const productId = product.id
        const price = product.price

        if (user) {
            try {
                const response = await addCart(product.id, quantity)
                console.log(response)

                loadCart()
            }
            catch (error) {
                console.error("서버 장바구니 추가 실패", error);
            }
        }

        else {
            setCartItems( (prev) => {
                const existing = prev[productId]

                return {
                    ...prev,
                    [productId] : {
                        price,
                        quantity:existing? existing.quantity + quantity : quantity,
                    }
                }
            })
        }

        // // 키가 고정됨 = 2015 이전 까지
        // const obj = {
        //     city : "서울" 
        // }

        // //es6 
        // const name = "city";
        // const value = "서울";
        // //ES6의 객체 리터럴 문법 중 "계산된 속성명(computed property name)" 기능
        // //[name] => 계산된 속성명 임
        // const obj2 = {
        //     [name]: value  // → { city: "서울" }
        // };

    }

    // dev_7_fruits
    // 항목 제거
    const removeFromCart = async (productId) => {
        if (user) {
            try {
                await deleteCart(productId);
                await loadCart();   // 서버에서 카트를 다시 끌고 오면서 화면 갱신
                console.log("✅ 상품이 장바구니에서 제거되었습니다.")
            }
            catch (error) {
                console.error("❌ 서버 장바구니 삭제 실패", error)
            }
        }
    }

    // dev_8_2_fruits
    // 카트 전체 비우기
    const clearCart = async () => {

        if (user) { // 로그인 되어있을 때
            try {
                await deleteCart()
                setCartItems({})
            }
            catch (error) {
                console.error("서버 장바구니 비우기 실패", error)
            }
        }
        else {  // 로그인 안 되어있을 때
            setCartItems({})
            localStorage.removeItem("cart")
        }
    }

    const value = {
        removeFromCart, // dev_7_fruits
        userCart,   // dev_7_fruits
        addToCart,
        cartItems,
        getTotalItems,
        clearCart
    }

    return <CartContext Provider value={value}>{ children }</CartContext>
}

export const useCart = () => useContext(CartContext)