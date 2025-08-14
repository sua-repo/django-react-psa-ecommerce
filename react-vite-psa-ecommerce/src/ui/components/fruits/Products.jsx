import { getCategories } from "@/api/CategoryApi"
import { getProducts } from "@/api/ProductApi"
import { useEffect, useState } from "react"

// dev_2_fruits
const Products = () => {

    const [categories,setCategories] = useState([])
    // dev_4_fruits
    const [selectedCategory,setSelectedCategory] = useState("전체")
    const [products,setProducts] = useState([])
     
    
    useEffect(()=>{
      console.log("VITE_REQUEST_URL =", import.meta.env.VITE_REQUEST_URL);

        // 카테고리 가져오기
        getCategories()
            .then((res)=>{
                console.log(res)
                setCategories(res.data)
            })
            .catch((err)=>{console.log(err)})
        
        // dev_4_fruits
        // 상품 가져오기
        getProducts()
        .then((res)=>{
            console.log(res.data)

            setProducts(res.data)
        })
        .catch((err)=>{console.log(err)})

    },[])

   // filter 함수의 리턴값을 배열임
   const filterProducts = 
    selectedCategory == "전체" ? products.filter((product) => product.image != null) : products.filter((product)=> product.category.name == selectedCategory && product.image ) 
   
    products.filter((product)=> product.category.name == selectedCategory && product.image ) 
return(
<>
  {/* Fruits Shop Start*/}
  <div className="container-fluid fruite py-5">
    <div className="container py-5">
      <div className="tab-class text-center">
        <div className="row g-4">
          <div className="col-lg-4 text-start">
            <h1>Our Organic Products</h1>
          </div>
          <div className="col-lg-8 text-end">
            <ul className="nav nav-pills d-inline-flex text-center mb-5">
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill active"
                  data-bs-toggle="pill"
                  onClick={(event)=>{
                    event.preventDefault();
                    setSelectedCategory("전체")
                  }}
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    {"전체"}
                  </span>
                </a>
              </li>
              
              {categories && categories.map((category,index)=>(
                <li key={category.id || index} className="nav-item">
                  <a
                    className="d-flex py-2 m-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    onClick={(event)=>{
                      event.preventDefault()
                      setSelectedCategory(category.name)
                      console.log(category.name)
                    }}
                  >
                    <span className="text-dark" style={{ width: 130 }}>
                      {category.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show p-0 active">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  {/* dev_4_Fruit */}
                  {
                    filterProducts.map((product)=>(
                    <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img ratio ratio-4x3 overflow-hidden rounded-top">
                          <img
                            src={`${import.meta.env.VITE_REQUEST_URL}${product.image}`}
                            className="img-fluid w-100 rounded-top"
                            alt=""
                          />
                        </div>
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{ top: 10, left: 10 }}
                        >
                          {product.category.name}
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{product.name}</h4>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit sed do eiusmod te incididunt
                          </p>
                          {/* dev_4_fruits */}
                          <div className="d-flex flex-column align-items-center justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-2">
                              ${product.price} / kg
                            </p>
                            <a
                              href="#"
                              className="btn border border-secondary rounded-pill px-3 text-primary"
                            >
                              <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                              Add to cart
                            </a>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>   
            </div>
                
            </div>
          </div>
          <div id="tab-2" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-5.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Grapes</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-2.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Raspberries</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-3" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-1.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Oranges</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-6.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Apple</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-4" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-5.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Grapes</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-4.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Apricots</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-5" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-3.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Banana</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-2.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Raspberries</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img
                          src="img/fruite-item-1.jpg"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                        Fruits
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Oranges</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod te incididunt
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">
                            $4.99 / kg
                          </p>
                          <a
                            href="#"
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Fruits Shop End*/}
</>
       
    ) 
}

export default Products