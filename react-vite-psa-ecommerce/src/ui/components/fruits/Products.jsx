import { Outlet } from "react-router-dom"
import heroImg1 from '@/assets/fruits/img/hero-img-1.png'
import heroImg2 from '@/assets/fruits/img/hero-img-2.jpg'

//dev_2_fruit
const Header = () => {
    return (
        <>
  {/* Spinner Start */}
  {/* <div
    id="spinner"
    className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
  >
    <div className="spinner-grow text-primary" role="status" />
  </div> */}
  {/* Spinner End */}
  {/* Navbar start */}
  <div className="container-fluid fixed-top">
    <div className="container topbar bg-primary d-none d-lg-block">
      <div className="d-flex justify-content-between">
        <div className="top-info ps-2">
          <small className="me-3">
            <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
            <a href="#" className="text-white">
              123 Street, New York
            </a>
          </small>
          <small className="me-3">
            <i className="fas fa-envelope me-2 text-secondary" />
            <a href="#" className="text-white">
              Email@Example.com
            </a>
          </small>
        </div>
        <div className="top-link pe-2">
          <a href="#" className="text-white">
            <small className="text-white mx-2">Privacy Policy</small>/
          </a>
          <a href="#" className="text-white">
            <small className="text-white mx-2">Terms of Use</small>/
          </a>
          <a href="#" className="text-white">
            <small className="text-white ms-2">Sales and Refunds</small>
          </a>
        </div>
      </div>
    </div>
    <div className="container px-0">
      <nav className="navbar navbar-light bg-white navbar-expand-xl">
        <a href="index.html" className="navbar-brand">
          <h1 className="text-primary display-6">Fruitables</h1>
        </a>
        <button
          className="navbar-toggler py-2 px-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars text-primary" />
        </button>
        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
            <a href="index.html" className="nav-item nav-link active">
              Home
            </a>
            <a href="shop.html" className="nav-item nav-link">
              Shop
            </a>
            <a href="shop-detail.html" className="nav-item nav-link">
              Shop Detail
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <a href="cart.html" className="dropdown-item">
                  Cart
                </a>
                <a href="chackout.html" className="dropdown-item">
                  Chackout
                </a>
                <a href="testimonial.html" className="dropdown-item">
                  Testimonial
                </a>
                <a href="404.html" className="dropdown-item">
                  404 Page
                </a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>
          <div className="d-flex m-3 me-0">
            <button
              className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <i className="fas fa-search text-primary" />
            </button>
            <a href="#" className="position-relative me-4 my-auto">
              <i className="fa fa-shopping-bag fa-2x" />
              <span
                className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
              >
                3
              </span>
            </a>
            <a href="#" className="my-auto">
              <i className="fas fa-user fa-2x" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar End */}
  {/* Modal Search Start */}
  <div
    className="modal fade"
    id="searchModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Search by keyword
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body d-flex align-items-center">
          <div className="input-group w-75 mx-auto d-flex">
            <input
              type="search"
              className="form-control p-3"
              placeholder="keywords"
              aria-describedby="search-icon-1"
            />
            <span id="search-icon-1" className="input-group-text p-3">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
  {/* Hero Start */}
  <div className="container-fluid py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-12 col-lg-7">
          <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
          <h1 className="mb-5 display-3 text-primary">
            Organic Veggies &amp; Fruits Foods
          </h1>
          <div className="position-relative mx-auto">
            <input
              className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
              type="number"
              placeholder="Search"
            />
            <button
              type="submit"
              className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
              style={{ top: 0, right: "25%" }}
            >
              Submit Now
            </button>
          </div>
        </div>
        <div className="col-md-12 col-lg-5">
          <div
            id="carouselId"
            className="carousel slide position-relative"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active rounded">
                <img
                  src={heroImg1}
                  className="img-fluid w-100 h-100 bg-secondary rounded"
                  alt="First slide"
                />
                <a href="#" className="btn px-4 py-2 text-white rounded">
                  Fruites
                </a>
              </div>
              <div className="carousel-item rounded">
                <img
                  src={heroImg2}
                  className="img-fluid w-100 h-100 rounded"
                  alt="Second slide"
                />
                <a href="#" className="btn px-4 py-2 text-white rounded">
                  Vesitables
                </a>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselId"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselId"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Hero End */}
</>

  
    )
}

export default Header