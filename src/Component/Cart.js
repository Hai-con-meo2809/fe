import React, { useEffect, useState,useRef } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Tepcss/cart.css';
const Cart = () => {
  const get = useRef("console lần 2");
  const value = 1;


const thu2 = () =>{
      get.current = "ko biet";
      console.log(get.current);
};
const thu = () =>{
    console.log('thử lần 1');
};
  const DetailsCart = () => {
    const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  console.log('làn 1');
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(location.pathname);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    if(cartItems.length < 0){
      const nofication = <div>Chưa có món hàng nào...</div>
    }
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const chuyendoi = totalPrice.toLocaleString('vi-VN');
    return (
      <div className="cart-header">
       <div className='tieude'>
            <h2 ref={get}  onClick={thu}>Cart  {value}</h2>
            <p onClick={thu2}>{cartItems.length} Khóa học trong giỏ hàng</p>
            <div className='lines'>
        <span></span>
        </div>
      </div>
      
      <div className="cart-container">
        <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item">
            <img src={item.thumbnailImage} alt="course" />
            <div className="cart-item-details">
              <div className="cart-item-title">{item.title}</div>
              <div className="cart-item-instructor">Bởi Jose Portilla và 1 giảng viên khác</div>
              <div className="cart-item-rating">4.6 ⭐ (508.760 xếp hạng)</div>
              <div className='fontchu'>Tổng số 22 giờ • 156 bài giảng • Tất cả trình độ</div>
              <div className='fontchu'>
                <a href="#"  onClick={() => removeFromCart(index)} className='fontchu'>Xóa</a> • <a href="#"  className='fontchu'>Lưu để mua sau</a> • <a href="#"  className='fontchu'>Chuyển vào danh sách mong ước</a>
              </div>
            </div>
            <div className="cart-item-price">{item.price.toLocaleString('vi-VN')}$</div>
            </div>
            ))}
          <div className='lines'>
        <span></span>
        </div>
       
        </div>
      
        <div className="cart-summary">
          <div className="cart-summary-total">Tổng: {chuyendoi}$</div>
          {/* <div className="cart-summary-discount fontchu">đ 2.498.000 Giảm 78%</div> */}
          <button className="cart-summary-button" onClick={() => navigate('/test')}>Thanh toán</button>
          <div className="cart-summary-coupon">
            <input className='cart-input' type="text" placeholder="Nhập coupon" />
            <button className="cart-summary-buttons">Áp dụng</button>
          </div>
        </div>

      </div>
    </div>
    );
  }
  return (
    <div>

    <DetailsCart/>
    </div>
  );
}

export default Cart;
