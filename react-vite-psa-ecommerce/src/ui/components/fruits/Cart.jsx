import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { formatCurrencyWithWon } from '@/utils/format';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// dev_7_fruits : 카트 페이지

// {
//   "cart": [
//     {
//       "product": {...},
//       "quantity": 2,
//       "price": "15000.00",
//       "total_price": "30000.00"
//     },
//     ...
//   ],
//   "cart_total_items": 5,
//   "cart_total_price": "78000.00"
// }

const Cart = () => {
  const VITE_REQUEST_URL = import.meta.env.VITE_REQUEST_URL;

  const { userCart, addToCart, removeFromCart } = useCart();
  const { user } = useAuth(); // 유저 상태
  const navigate = useNavigate();

  // 로그인 여부 확인 후 미로그인 시 리디렉션
  // [user, navigate]는 이 배열 안에 있는 값 중 하나라도 바뀌면 useEffect 안의 콜백 함수가 다시 실행
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleRemoveItem = (product) => {
    removeFromCart(product.id)
  }

  const handleIncrease = (item) => {
    addToCart(item.product, 1)
  }

  const handleDecrease = (item) => {

    if (item.quantity > 1) 
        addToCart(item.product, -1)

    else if (item.quantity == 1) { 
        handleRemoveItem(item.product)
    }
  }

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      {/* Cart Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {userCart &&
                  userCart.cart.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={`${VITE_REQUEST_URL}/${item.product.image}`}
                            className="img-fluid me-5 rounded-circle"
                            style={{ width: 80, height: 80 }}
                            alt=""
                          />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{item.product.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{item.product.price} 원</p>
                      </td>
                      <td>
                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                          <div className="input-group-btn">
                            <button onClick={() => handleDecrease(item)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-center border-0"
                            value={item.quantity}
                            onChange={() => {}}
                          />
                          <div className="input-group-btn">
                            <button onClick={() => handleIncrease(item)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{formatCurrencyWithWon(Math.floor(item.total_price))}</p>
                      </td>
                      <td>
                        <button onClick={() => handleRemoveItem(item.product)} className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="fa fa-times text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">
              Apply Coupon
            </button>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                    Cart <span className="fw-normal">Total</span>
                  </h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">$96.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Shipping</h5>
                    <div className="">
                      <p className="mb-0">Flat rate: $3.00</p>
                    </div>
                  </div>
                  <p className="mb-0 text-end">Shipping to Ukraine.</p>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">{userCart && formatCurrencyWithWon(userCart.cart_total_price)}</p>
                </div>
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button"
                >
                  Proceed Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Page End */}
    </>
  );
};

export default Cart;
