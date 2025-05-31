import React from 'react'
import Nav from '../Nav/Nav'
import './Blog.css'

function Newblog() {
  return (
    <div>
      <Nav/>
      
      <div className="blog-container">
      <div className="logo">
          <span className="logo-icon">MEAL</span>
          <span>mate</span>
      </div>
      {/* Centered Header */}
      <h1 className="blog-header">
        Our <span>Blogs</span>
      </h1>

      {/* Blog Cards */}
      <div className="blog-cards">
        <div className="blog-card">
          <img src="https://i.pinimg.com/736x/38/53/0f/38530f56238ff21090fdf8d6b9566ac2.jpg" alt="cafeteria" />
          <h2>The Future of Online Food Ordering</h2>
          <p1>By Admin / 27th March, 2025</p1>
          <p>Discover how online ordering platforms are enhancing the dining experience and ensuring students get their favorite meals with just a few clicks.</p>
          <button className="read-more">Read More</button>
        </div>

        <div className="blog-card">
          <img src="https://i.pinimg.com/736x/26/83/10/26831027b59d4bef1dde617a9013c873.jpg" alt="online payment" />
          <h2>Smart Strategies for Student Satisfaction</h2>
          <p1>By Anjalee / 29th March, 2025</p1>
          <p>From pre-order options to cashless payments, here are the strategies to improve efficiency and enhance student satisfaction in our cafeteria</p>
          <button className="read-more">Read More</button>
        </div>

        <div className="blog-card">
          <img src="https://i.pinimg.com/736x/53/e2/04/53e2046fe7290e4d1111d721eb3495e8.jpg" alt="nutritional info" />
          <h2>Checking Nutritional Information Before Ordering</h2>
          <p1>By Collinson / 23rd March, 2025</p1>
          <p>Discover how nutritional transparency helps students make better food decisions every day.</p>
          <button className="read-more">Read More</button>
        </div>

        <div className="blog-card">
          <img src="https://i.pinimg.com/736x/72/6c/1d/726c1d9f7cd66522977c8dfc36906f34.jpg" alt="track order" />
          <h2>Track your order to know exactly where it is</h2>
          <p1>By Jhone / 01st April, 2025</p1>
          <p>Track its journey from the beginning of the process to the time it arrives at your doorstep, ensuring complete transparency and peace of mind.</p>
          <button className="read-more">Read More</button>
        </div>

        <div className="blog-card">
          <img src="https://i.pinimg.com/736x/c1/8a/6e/c18a6e302d2040b43b90ae3b6ca639e5.jpg" alt="save time" />
          <h2>Save Time with Smart Food Ordering on your busy day</h2>
          <p1>By Nick / 30th March, 2025</p1>
          <p>Learn how online food ordering systems are designed to save you time, whether you're in between classes or need a quick meal on the go.</p>
          <button className="read-more">Read More</button>
        </div>
      </div>
    </div>
    <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon">MEAL</span>
                            <span>mate</span>
                        </div>
                        <p className="footer-about">
                            Your trusted partner for delicious and convenient hostel dining. We make every meal special with quality ingredients and excellent service.
                        </p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/menu">Menu</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Services</h3>
                        <ul className="footer-links">
                            <li><a href="/daily-meals">Daily Meals</a></li>
                            <li><a href="/special-diet">Special Diet</a></li>
                            <li><a href="/meal-plans">Meal Plans</a></li>
                            <li><a href="/quick-snacks">Quick Snacks</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contact Info</h3>
                        <div className="footer-contact">
                            <p><i className="fas fa-map-marker-alt"></i> Hostel Campus, University Road</p>
                            <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
                            <p><i className="fas fa-envelope"></i> info@mealmate.com</p>
                            <p><i className="fas fa-clock"></i> Mon - Sun: 7:00 AM - 10:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MEALmate. All rights reserved.</p>
                </div>
            </footer> 
    </div>
  )
}

export default Newblog