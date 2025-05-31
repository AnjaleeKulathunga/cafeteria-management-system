import React, { useState, useEffect } from "react";
import "./Home.css"; 
import Nav from "../Nav/Nav";
import bannerImage1 from "../../assets/bannerImage1.jpg";
import { Link } from "react-router-dom";

function Home({ showNav = true }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      subtitle: "BEST PLACE TO DINE",
      title: "MEALMATE"
    },
    {
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      subtitle: "ORDER ANYTIME",
      title: "HOSTEL CAFE"
    },
    {
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      subtitle: "FRESH & HEALTHY",
      title: "CAMPUS DINING"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      { user && user.role == 'customer' ? <Nav/> : <InitialNav /> }
      <div className="hero-section">
        <div className="hero-text">
          <h1>
            "Welcome to <span className="highlight">MEAL</span><span className="highlight1">mate</span>  Order your favorite meals effortlessly and enjoy a hassle-free dining experience!"
          </h1>
          <p className="hero-subtext">
            <i>
              we serve you the most healthy and tastiest food you ever tried.
              Health and taste is our primary priority, thinking health comes first.
            </i>
          </p>
        </div>
      </div>
      <div className="focus-section">
          <div className="focus-content">
            <h2>Focus on what matters</h2>
            <p>All the charts, notifications, and order tracking in the world can't beat the satisfaction of enjoying a delicious, well-prepared meal. Experience the simplicity of ordering your favorite dishes with just a few clicks.</p>
            <a href="/menu" className="focus-button">Explore Menu</a>
          </div>
          <div className="focus-image">
            <img src="https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                 alt="Cafeteria dining" />
          </div>
        </div>
 
      <div className="support-center">
        <h1>Support center</h1>
        <p className="support-description">
          Need help with your cafeteria orders? Our dedicated support team is here to assist you 24/7 with your dining experience, from placing orders to special dietary requirements.
        </p>
        
        <div className="support-cards">
        <Link to="/contactus" className="active home-a">
          <div className="support-card">
            <div className="support-icon">🍽️</div>
            <h3>Order Support</h3>
            <p>Having trouble placing your order? Need to modify your meal selection or have questions about delivery timing? Our order support team is here to help you with all your dining needs.</p>
          </div>
          </Link>

          <div className="support-card">
            <div className="support-icon">💳</div>
            <h3>Payment Issues</h3>
            <p>Questions about payment methods, meal plan credits, or transaction history? Our payment support team will help resolve any billing concerns quickly and securely.</p>
          </div>

          <div className="support-card">
            <div className="support-icon">🥗</div>
            <h3>Dietary Assistance</h3>
            <p>Special dietary requirements or allergies? Our nutrition experts can help you find suitable meal options and customize your orders to meet your dietary needs.</p>
          </div>
        </div>
      </div>
      
      <div className="nav-options">
        <div className="nav-item">
          <h2>Menu</h2>
          <p>Contact us for more details</p>
          <button>menu</button>
        </div>
        <div className="nav-divider"></div>
        <div className="nav-item">
          <h2>Order</h2>
          <p>Contact us for more details</p>
          <button>orders</button>
        </div>
        <div className="nav-divider"></div>
        <div className="nav-item">
          <h2>Feedback</h2>
          <p>Contact us for more details</p>
          <button>feedback</button>
        </div>
        
      </div>
      <div>


      </div>
      <div className="full-width-image1" >
        <img src={bannerImage1} alt="Cafeteria Banner" className="banner-image1" />
        <div className="image-text1">

"Welcome to Meal Mate! Your go-to website for quick and easy hostel cafeteria orders. Browse the menu, place your order, and enjoy personalized meal suggestions – all at your fingertips!" </div>
      </div>
      <div>
     
      </div>
      <div className="styles-section">
        <div className="styles-content">
          <h2>Special dishes are finally here</h2>
          <p>This season, our new menu collection will delight you with carefully crafted dishes that combine traditional flavors with modern culinary excellence.</p>
          <a href="/menu" className="styles-button">View Menu</a>
        </div>
        
        <div className="styles-grid">
          <div className="style-item item1">
            <img src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                 alt="Student cafeteria" />
          </div>
          <div className="style-item item2">
            <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                 alt="Healthy meal prep" />
          </div>
          <div className="style-item item3">
            <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                 alt="Cafeteria counter" />
          </div>
          <div className="style-item item4">
            <img src="https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                 alt="Student dining" />
          </div>
          <div className="style-item item5">
            <img src="https://images.unsplash.com/photo-1557499305-0af888c3d8ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                 alt="Cafeteria setup" />
          </div>
        </div>
      </div>

      <div className="carousel-container main">
        <div className="carousel">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-content">
                <p className="slide-subtitle">{slide.subtitle}</p>
                <h2 className="slide-title">{slide.title}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="services-section">
        <div className="services-header">
          <h2>What we offer in our cafeteria</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                   alt="Daily Meals" />
            </div>
            <h3 className="service-title">Daily Meals</h3>
            <p className="service-description">Nutritious breakfast, lunch, and dinner options prepared fresh daily in our kitchen.</p>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1509315703195-529879416a7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                   alt="Quick Snacks" />
            </div>
            <h3 className="service-title">Quick Snacks</h3>
            <p className="service-description">Variety of snacks and beverages available throughout the day for quick bites between classes.</p>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                   alt="Special Diet" />
            </div>
            <h3 className="service-title">Special Diet</h3>
            <p className="service-description">Customized meal options for vegetarian, vegan, and other dietary requirements.</p>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                   alt="Meal Packages" />
            </div>
            <h3 className="service-title">Meal Packages</h3>
            <p className="service-description">Weekly and monthly meal plans at discounted rates for regular customers.</p>
          </div>
        </div>
      </div>
      <div className="feedback-section">
        <div className="feedback-header">
          <h2 className="feedback-title">What Our Students Say</h2>
          <p className="feedback-subtitle">Hear from our satisfied students about their dining experience with MEALmate</p>
        </div>
        <div className="feedback-grid">
          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Customer" />
            </div>
            <h3 className="feedback-name">binosh ariyarathna</h3>
            <p className="feedback-position">Third Year Student</p>
            <p className="feedback-company">NSBM Hostel</p>
            <div className="star-rating">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <p className="feedback-text">This app has made ordering food so much easier. No more waiting in queues, and I can know exactly when my food will be ready. It's super convenient!</p>
            <p className="feedback-date">April 2023</p>
          </div>

          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" alt="Customer" />
            </div>
            <h3 className="feedback-name">john sanooda</h3>
            <p className="feedback-position">Second Year Student</p>
            <p className="feedback-company">NSBM Hostel</p>
            <div className="star-rating">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star-empty">★</span>
            </div>
            <p className="feedback-text">Being able to view the menu and order for the entire day in advance is really helpful. The food quality is great too. Keep improving!</p>
            <p className="feedback-date">January 2023</p>
          </div>

          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80" alt="Customer" />
            </div>
            <h3 className="feedback-name">sheron bandara</h3>
            <p className="feedback-position">First Year Student</p>
            <p className="feedback-company">NSBM Hostel</p>
            <div className="star-rating">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <p className="feedback-text">Saves so much time between classes. I can order anytime and pick up easily. The payment system is really convenient too!</p>
            <p className="feedback-date">February 2023</p>
          </div>
        </div>
      </div>
      <div className="iris-blog-section">
        <h1 className="iris-blog-title">Meal<span className="abc">mate</span> Updates</h1>
        <div className="iris-blog-subtitle">
          <h2>Your go-to source for cafeteria updates & meal planning</h2>
          <p>Stay informed about our latest menu items, special offers, and healthy eating tips designed to enhance your dining experience.</p>
        </div>
        <div className="iris-blog-cards">
          <Link to="/blog" className="iris-card blog">
            <div className="card-overlay">
              <span className="arrow-icon">↗</span>
              <h3>BLOG</h3>
            </div>
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80" alt="Today's Menu" />
          </Link>
          <a href="/blog" className="iris-card news">
            <div className="card-overlay">
              <span className="arrow-icon">↗</span>
              <h3>SPECIALS</h3>
            </div>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Daily Specials" />
          </a>
          <Link to="/aboutmealmate" className="iris-card case-studies">
            <div className="card-overlay">
              <span className="arrow-icon">↗</span>
              <h3>About Us</h3>
            </div>
            <img src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" alt="Meal Plans" />
          </Link>
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
  );
}

export default Home;