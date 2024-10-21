import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faBoxes,
  faShoppingCart,
  faUser, faList,faHeart
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap'; // Import Dropdown từ Bootstrap
import '../Tepcss/custom-header.css';

const CustomHeader = () => {

    const [searchOpen, setSearchOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); // Lưu index của item được chọn
    const navigate = useNavigate();
    const location = useLocation(); // Lấy location từ react-router-dom

    const check = (index, path) => {
        setActiveIndex(index);
        navigate(path); 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        if (token && storedUserName) {
            setUserName(storedUserName);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');   // Xóa token khỏi localStorage
        localStorage.removeItem('userName');  // Xóa tên người dùng khỏi localStorage
        setUserName(null);  // Cập nhật state để phản ánh thay đổi
        navigate('/');  // Chuyển hướng người dùng đến trang đăng nhập
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <header className="custom-header">
            <nav className="navbar-custom">
                <div className="logo-section">
                    <div className="logo">
                        <span>B</span>
                    </div>
                </div>
                <ul className="navbar-links">
                    <li className="nav-item" onClick={() => check(0, '/')}>
                        <FontAwesomeIcon icon={faHome} className={`icon ${activeIndex === 0 ? 'iconColor' : ''}`} />
                        <span className={`nav-text ${activeIndex === 0 ? 'iconColor' : ''}`}>Home</span>
                    </li>
         
                    <li className="nav-item" onClick={() => check(1, '/teachingcourse')}>
                        <FontAwesomeIcon icon={faTachometerAlt} className={`icon ${activeIndex === 1 ? 'iconColor' : ''}`} />
                        <span className={`nav-text ${activeIndex === 1 ? 'iconColor' : ''}`}>Teaching</span>
                    </li>
                    <li className="nav-item" onClick={() => check(2, '/cart')}>
                        <FontAwesomeIcon icon={faShoppingCart} className={`icon ${activeIndex === 2 ? 'iconColor' : ''}`} />
                        <span className={`nav-text ${activeIndex === 2 ? 'iconColor' : ''}`}>Cart</span>
                    </li>
                    <li className="nav-item" onClick={() => check(3, '/study')}>
                        <FontAwesomeIcon icon={faBoxes} className={`icon ${activeIndex === 3 ? 'iconColor' : ''}`} />
                        <span className={`nav-text ${activeIndex === 3 ? 'iconColor' : ''}`}>Study</span>
                    </li>
                    <li className="nav-item" onClick={() => check(4, '/dog')}>
                        <FontAwesomeIcon icon={faHeart} className={`icon ${activeIndex === 4 ? 'iconColor' : ''}`} />
                        <span className={`nav-text ${activeIndex === 4 ? 'iconColor' : ''}`}>Favourite</span>
                    </li>
                </ul>
                <div className="right-section">
                    <span className="category">Category</span>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." className="search-input" />
                    </div>
                    {!userName ? (
                        <div className="auth-buttons">
                            <NavLink as={Link} to="/login" state={{from: location}} className="login-button">Login</NavLink>
                            <NavLink as={Link} to="/register" className="signup-button">Sign-up</NavLink>
                        </div>
                    ) : (
                        <Dropdown align="end">
                        <Dropdown.Toggle variant="link" id="dropdown-user" className="p-0">
                            <img
                                src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg"
                                alt="User Avatar"
                                className="rounded-circle"
                                style={{ width: '40px', height: '40px' }}
                            />
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.ItemText>
                                <div className="custom-item-text">
                                    <img
                                        src="https://brocanvas.com/wp-content/uploads/2022/01/Meo-Scottish-Fold.jpg"
                                        alt="User Avatar"
                                        className="rounded-circle"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <p>2003@gmail.com</p>
                                </div>
                            </Dropdown.ItemText>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => navigate('/setting')} className="custom-dropdown-item">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/message')} className="custom-dropdown-item">Message</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="custom-dropdown-item">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    )}
                </div>
            </nav>
        </header>
    );
};

export default CustomHeader;
