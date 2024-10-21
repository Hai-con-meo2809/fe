import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "./AppContext";

const Body = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const cachedData = localStorage.getItem("products");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://comics-truyentranh.somee.com/api/GetData"
          "https://dog.ceo/api/breeds/image/random"
        );
        // const response = await axios.get('https://d11a-2402-800-6313-de3d-cccc-6e18-e5ac-8a11.ngrok-free.app/api/GetData');

        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (course) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingCourseIndex = cart.findIndex(
      (item) => item.courseId === course.courseId
    );
    if (existingCourseIndex >= 0) {
      alert("Khóa học này đã có trong giỏ hàng");
    } else {
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Đã thêm khóa học vào giỏ hàng");
    }
  };
  return (
    <div key={location.pathname}>
      <section className="home-banner-area"></section>
      <section className="popular-course-area section-gap col-lg-11 body-fake">
        {/* <div className="container-fluid"> */}
        <div className="row justify-content-center section-title">
          <div className="col-lg-12">
            <h2>
              Popular Courses hello<br />
              Available Right Now
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="owl-carousel popuar-course-carusel">
          <div className="tong">
            {products.length > 0 ? (
              <>
                {products.map((course, index) => (
                  <Link
                    key={index}
                    to="/course"
                    state={{ courseId: course.courseId }}
                  >
                    <div key={index} className="single-popular-course">
                      <div className="thumb">
                        <img
                          className="f-img img-fluid mx-auto"
                          src={course.message}
                          alt=""
                        />
                      </div>
                      <div className="details">
                        <div className="justify-content-between mb-20">
                          <p className="name">{course.title}</p>

                          <p>{course.instructorName}</p>
                          <p className="name">
                            4.6 <FontAwesomeIcon icon={faStar} />
                          </p>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(course);
                            }}
                          >
                            <a className="chencart">
                              <p className="name">
                                đ {course.price.toLocaleString("vi-VN")}
                              </p>
                              <span>
                                <FontAwesomeIcon icon={faCartPlus} />
                              </span>
                            </a>
                          </Link>
                        </div>
                        {/* <a href="#">
                <h4>{course.title}</h4>
              </a> */}
                        {/* <div className="bottom d-flex mt-15">
                <ul className="list">
                  <li>
                    <a href="#"><i className="fa fa-star"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-star"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-star"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-star"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-star"></i></a>
                  </li>
                </ul>
                <p className="ml-20">25 Reviews</p>
          
              </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <p>
                Loading courses...{" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6QHtCc19iHwai9HnUh7jXBtPwqxfKEo90eC3lXvtbr-NqeJpYfA0Zj4hSM51_gonus1g&usqp=CAU"
                  width={100}
                  height={100}
                />
              </p> // Hiển thị Loading khi chưa có data
            )}
            {/* ): (<p>Loading courses...</p>)} */}
          </div>
        </div>

        {/* </div> */}
      </section>
      {/* <div className="course-container">
      
      {products.map((course) => (
        <div key={course.courseId} className="course-item">
          <img src={course.thumbnailImage} alt={course.title} className="course-thumbnail" />
          <div className="course-details">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-rating">
              <span className="rating">{Array(Math.floor(course.rating)).fill('★').join('')}</span>
              <span className="rating-count">({course.ratingCount})</span>
            </div>
            <div className="course-price">
              <span className="price">đ {course.price.toLocaleString()}</span>
              <button className="buy-btn">Bản chạy nhất</button>
            </div>
          </div>
        </div>
      ))}
    </div> */}

      <section className="video-area section-gap-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="section-title text-white">
                <h2 className="text-white">
                  Watch Our Trainers in Live Action <br />
                </h2>
                <p>
                  In the history of modern astronomy, there is probably no one
                  greater leap forward than the building and launch of the space
                  telescope known as the Hubble.
                </p>
              </div>
            </div>
            <div className="offset-lg-1 col-md-6 video-left">
              <div className="owl-carousel video-carousel">
                <div className="single-video">
                  <div className="video-part">
                    <img className="img-fluid" src="img/video-img.jpg" alt="" />
                    <div className="overlay"></div>
                    <a
                      className="popup-youtube play-btn"
                      href="https://www.youtube.com/watch?v=VufDd-QL1c0"
                    >
                      <img
                        className="play-icon"
                        src="img/play-btn.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <h4 className="text-white mb-20 mt-30">
                    Learn Angular js Course for Legendary Persons
                  </h4>
                  <p className="text-white mb-20">
                    In the history of modern astronomy, there is probably no one
                    greater leap forward than the building and launch of the
                    space telescope known as the Hubble.
                  </p>
                </div>

                <div className="single-video">
                  <div className="video-part">
                    <img className="img-fluid" src="img/video-img.jpg" alt="" />
                    <div className="overlay"></div>
                    <a
                      className="popup-youtube play-btn"
                      href="https://www.youtube.com/watch?v=VufDd-QL1c0"
                    >
                      <img
                        className="play-icon"
                        src="img/play-btn.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <h4 className="text-white mb-20 mt-30">
                    Learn Angular js Course for Legendary Persons
                  </h4>
                  <p className="text-white mb-20">
                    In the history of modern astronomy, there is probably no one
                    greater leap forward than the building and launch of the
                    space telescope known as the Hubble.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="other-feature-area">
        <div className="container">
          <div className="feature-inner row">
            <div className="col-lg-12">
              <div className="section-title text-left">
                <h2>
                  Features That <br />
                  Can Avail By Everyone
                </h2>
                <p>
                  If you are looking at blank cassettes on the web, you may be
                  very confused at the difference in price. You may see some for
                  as low as $.17 each.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="other-feature-item">
                <i className="ti-key"></i>
                <h4>Lifetime Access</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--160">
              <div className="other-feature-item">
                <i className="ti-files"></i>
                <h4>Source File Included</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--260">
              <div className="other-feature-item">
                <i className="ti-medall-alt"></i>
                <h4>Student Membership</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="other-feature-item">
                <i className="ti-briefcase"></i>
                <h4>35000+ Courses</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--160">
              <div className="other-feature-item">
                <i className="ti-crown"></i>
                <h4>Expert Mentors</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--260">
              <div className="other-feature-item">
                <i className="ti-headphone-alt"></i>
                <h4>Live Supports</h4>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore. Lorem ipsum dolor
                    sit amet consec tetur adipisicing elit, sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-area section-gap">
        <div className="container">
          <div className="testi-slider owl-carousel" data-slider-id="1">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="item">
                  <div className="testi-item">
                    <img src="img/quote.png" alt="" />
                    <div className="mt-40 text">
                      <p>
                        As conscious traveling Paup ers we must always be
                        oncerned about our dear Mother Earth. If you think about
                        it, you travel across her face and She is the host to
                        your journey.
                      </p>
                    </div>
                    <h4>Fanny Spencer</h4>
                    <p>Chief Executive, Amazon</p>
                  </div>
                </div>
              </div>

              <div className="offset-lg-1 col-lg-6">
                <img src="img/testimonial/t1.jpg" alt="" />
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="item">
                  <div className="testi-item">
                    <img src="img/quote.png" alt="" />
                    <div className="mt-40 text">
                      <p>
                        As conscious traveling Paup ers we must always be
                        oncerned about our dear Mother Earth. If you think about
                        it, you travel across her face <br />
                        and She is the host to your journey.
                      </p>
                    </div>
                    <h4>Fanny Spencer</h4>
                    <p>Chief Executive, Amazon</p>
                  </div>
                </div>
              </div>

              <div className="offset-lg-1 col-lg-6">
                <img src="img/testimonial/t1.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-area">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-5">
              <div className="section-title text-left text-white">
                <h2 className="text-white">
                  Watch Our Trainers <br />
                  in Live Action
                </h2>
                <p>
                  If you are looking at blank cassettes on the web, you may be
                  very confused at the difference in price. You may see some for
                  as low as $.17 each.
                </p>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-4 col-md-6">
              <div className="course-form-section">
                <h3 className="text-white">Courses for Free</h3>
                <p className="text-white">It is high time for learning</p>
                <form
                  className="course-form-area contact-page-form course-form text-right"
                  id="myForm"
                  action="mail.html"
                  method="post"
                >
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Name'"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Phone Number"
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Phone Number'"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Email Address'"
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <button className="btn text-uppercase">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-post-area section-gap">
        <div className="container-fluid">
          <div className="feature-inner row">
            <div className="col-lg-12">
              <div className="section-title text-left">
                <h2>
                  Features That <br />
                  Can Avail By Everyone
                </h2>
                <p>
                  There is a moment in the life of any aspiring astronomer that
                  it is time to buy that first telescope. It’s exciting to think
                  about setting up your own viewing station.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <img src="img/blog-post/b1.jpg" className="img-fluid" alt="" />
                <div className="overlay"></div>
                <div className="top-text">
                  <p>29th, oct, 2018</p>
                  <p>121 likes</p>
                  <p>05 comments</p>
                </div>
                <div className="text">
                  <h4 className="text-white">Smart Kitchen Setup</h4>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                      sed do.
                    </p>
                  </div>
                  <a href="#" className="primary-btn">
                    View Details
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--160">
              <div className="single-blog-post">
                <img src="img/blog-post/b2.jpg" className="img-fluid" alt="" />
                <div className="overlay"></div>
                <div className="top-text">
                  <p>29th, oct, 2018</p>
                  <p>121 likes</p>
                  <p>05 comments</p>
                </div>
                <div className="text">
                  <h4 className="text-white">Smart Kitchen Setup</h4>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                      sed do.
                    </p>
                  </div>
                  <a href="#" className="primary-btn">
                    View Details
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt--260">
              <div className="single-blog-post">
                <img src="img/blog-post/b3.jpg" className="img-fluid" alt="" />
                <div className="overlay"></div>
                <div className="top-text">
                  <p>29th, oct, 2018</p>
                  <p>121 likes</p>
                  <p>05 comments</p>
                </div>
                <div className="text">
                  <h4 className="text-white">Smart Kitchen Setup</h4>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consec tetur adipisicing elit,
                      sed do.
                    </p>
                  </div>
                  <a href="#" className="primary-btn">
                    View Details
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
