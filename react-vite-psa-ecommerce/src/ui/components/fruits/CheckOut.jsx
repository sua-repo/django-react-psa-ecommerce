import { useCart } from '@/contexts/CartContext';
import { formatCurrency, formatCurrencyWithWon } from '@/utils/format';
import React, { useState } from 'react';

// dev_8_fruits
const CheckOut = () => {
    const [shippingData, setShippingData] = useState({
        full_name : '',
        address1 : '',
        city : '',
        country : '',
        zipcode : '',
        phone : '',
        email : '',
    })

    const {userCart} = useCart()

    const handleChange = (event) => {
        const {name, value} = event.target;

        // setShippingData({
        //     full_name : '',
        //     address1 : '',
        //     city : '',
        //     country : '',
        //     zipcode : '',
        //     phone : '',
        //     email : '',
        // });


        // setShippingData((prev) => {
        //     return( {...prev, [name] : value} )
        // });

        setShippingData((prev) => ( {...prev, [name] : value} ));
    }

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Checkout Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form action="#">
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        이름<sup>*</sup>
                      </label>
                      <input type="text" name="full_name" onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                </div>
                
                <div className="form-item">
                  <label className="form-label my-3">
                    Address <sup>*</sup>
                  </label>
                  <input type="text" name="address1" onChange={handleChange} className="form-control" placeholder="House Number Street Name" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Town/City<sup>*</sup>
                  </label>
                  <input type="text" name="city" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Country<sup>*</sup>
                  </label>
                  <input type="text" name="country" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Postcode/Zip<sup>*</sup>
                  </label>
                  <input type="text" name="zipcode" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Mobile<sup>*</sup>
                  </label>
                  <input type="tel" name="phone" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Email Address<sup>*</sup>
                  </label>
                  <input type="email" name="email" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-check my-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Account-1"
                    name="Accounts"
                    defaultValue="Accounts"
                  />
                  <label className="form-check-label" htmlFor="Account-1">
                    Create an account?
                  </label>
                </div>
                <hr />
                <div className="form-check my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Address-1"
                    name="Address"
                    defaultValue="Address"
                  />
                  <label className="form-check-label" htmlFor="Address-1">
                    Ship to a different address?
                  </label>
                </div>
                <div className="form-item">
                  <textarea
                    name="text"
                    className="form-control"
                    spellCheck="false"
                    cols={30}
                    rows={11}
                    placeholder="Oreder Notes (Optional)"
                    defaultValue={'문 앞에 놔 주세요'}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                        { userCart && userCart?.cart?.map( (item, index) => (
                            <tr>
                                <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                    <img 
                                    src={`${import.meta.env.VITE_REQUEST_URL}/${item.product.image}`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: 90, height: 90 }}
                                    alt=""
                                    />
                                </div>
                                </th>
                                <td className="py-5">{item.product.name}</td>
                                <td className="py-5">{formatCurrencyWithWon(item.product.price)}</td>
                                <td className="py-5">{item.quantity}</td>
                                <td className="py-5">{formatCurrencyWithWon(item.total_price)}</td>
                            </tr>
                        ))}
                      
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5" />
                        <td className="py-5" />
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">{userCart && formatCurrencyWithWon(userCart.cart_total_price)}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-4">Shipping</p>
                        </td>
                        <td colSpan={3} className="py-5">
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-1"
                              name="Shipping-1"
                              defaultValue="Shipping"
                            />
                            <label className="form-check-label" htmlFor="Shipping-1">
                              Free Shipping
                            </label>
                          </div>
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-2"
                              name="Shipping-1"
                              defaultValue="Shipping"
                            />
                            <label className="form-check-label" htmlFor="Shipping-2">
                              Flat rate: $15.00
                            </label>
                          </div>
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-3"
                              name="Shipping-1"
                              defaultValue="Shipping"
                            />
                            <label className="form-check-label" htmlFor="Shipping-3">
                              Local Pickup: $8.00
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                        </td>
                        <td className="py-5" />
                        <td className="py-5" />
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">{userCart && formatCurrencyWithWon(userCart.cart_total_price)}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="Transfer"
                        defaultValue="Transfer"
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please use your Order ID as the payment
                      reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="Payments"
                        defaultValue="Payments"
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="Delivery"
                        defaultValue="Delivery"
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="Paypal"
                        defaultValue="Paypal"
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Checkout Page End */}
    </>
  );
};

export default CheckOut;
