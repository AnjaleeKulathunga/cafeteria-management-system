import React from 'react';
import './AboutMealMate.css';
import about from '../../Pictures/about.jpg';
import vision from '../../Pictures/vision.jpg';
import mealplaning from '../../Pictures/meal-planing.jpg';
import menu from '../../Pictures/menu.jpg';
import feedback from '../../Pictures/feedback.jpg';
import analytics from '../../Pictures/analytics.jpg';
import schedule from '../../Pictures/schedule.jpg';
import fastorder from '../../Pictures/fastorder.png';
import facebookd from '../../Pictures/facebook_icon.png';
import twitter from '../../Pictures/twitter_icon.png';
import linkedin from '../../Pictures/linkedin_icon.png';
import Nav from '../Nav/Nav';

function AboutMealMate() {
  return (
    <div>
    <Nav/>
    <div>
        
            <section class="banner">
                <h1>About Meal<span className="abc">mate</span></h1>
                <p>At Meal Mate, we believe that ordering food at your hostel cafeteria should be quick, efficient, 
                    and hassle-free. Our platform is designed to revolutionize the way students and employees at university 
                    hostels manage their meals. Whether you’re in a rush between classes, planning your weekly meals, or looking for 
                    healthier food options, Meal Mate has got you covered.</p>
            </section>

            <section class="container">
                <div class="text-section">
                    <h2>Who are <span>We</span></h2>
                    <p>Meal Mate is an innovative online cafeteria ordering system specifically designed for government university students 
                        and accommodation providers, including private universities and corporate hostels. Our mission is to save your time 
                        and enhance your cafeteria experience by providing a seamless food ordering process that allows you to place orders anytime, anywhere.
                        We understand the common challenges hostel residents face when it comes to meal ordering—long queues, unavailability of preferred meals,
                         and lack of proper meal planning. Meal Mate eliminates these issues by offering an AI-powered meal planning system, real-time menu updates,
                          and an easy-to-use ordering interface.</p>
                </div>
                <div class="image-placeholder">
                    <img src={about} alt="Meal Mate" />
                </div>
            </section>
            <section className="key-features">
                <div className="feature-text">
                    <h2>Key Features</h2>
                    <div className="feature-cards">
                        <div className="card">
                            <img src={menu} alt="AI Meal Planning" />
                            <p>Generate meal plans using AI</p>
                        </div>
                        <div className="card">
                            <img src={mealplaning} alt="Digital Menu" />
                            <p>Digital Menu with Real-Time Updates</p>
                        </div>
                        <div className="card">
                            <img src={feedback} alt="AI Meal Planning" />
                            <p>Can provide feedback & complaints</p>
                        </div>
                        <div className="card">
                            <img src={analytics} alt="AI Meal Planning" />
                            <p>Generate Reports & Analytics</p>
                        </div>
                        <div className="card">
                            <img src={schedule} alt="AI Meal Planning" />
                            <p>Pre-Order & Scheduled Ordering</p>
                        </div>
                        <div className="card">
                            <img src={fastorder} alt="AI Meal Planning" />
                            <p>Fast & Easy Ordering</p>
                        </div>
                    </div>
                    
                </div>
            </section>

            <section class="container">
                <div class="text-section">
                    <h2>Our Vision</h2>
                    <p>Our mission is to enhance convenience and efficiency in hostel cafeterias by providing a seamless digital food ordering experience. We aim to minimize food wastage, 
                        reduce waiting times, and offer personalized meal recommendations tailored to individual needs.</p>
                </div>
                <div class="image-placeholder">
                    <img src={vision} alt="Meal Mate" />
                </div>
            </section>

            <section class="features">
                <h2 className="iris-blog-title">Why Choose Meal<span className="abc">mate</span></h2>
                <ul>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Time-Saving:</h4>
                        <p>No long lines—order in advance and pick up at your convenience.</p>
                    </div>
                    </li>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Convenience & Accessibility:</h4>
                        <p>Order anytime, anywhere, and customize meals.</p>
                    </div>
                    </li>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Student-Centric:</h4>
                        <p>Designed for university students with nutritious, budget-friendly options.</p>
                    </div>
                    </li>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Better Food Management:</h4>
                        <p>Reduces waste through demand forecasting.</p>
                    </div>
                    </li>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Seamless Integration:</h4>
                        <p>Works with hostel systems for meal plans, order tracking, and reports.</p>
                    </div>
                    </li>
                    <li>
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Multi-Platform Access:</h4>
                        <p>Available on mobile, web, and kiosks for a smooth experience.</p>
                    </div>
                    </li>
                </ul>
            </section>

            <section class="join">
                <h2>Join Us</h2>
                <p>Meal Mate is not just an app; it’s a community-driven solution that adapts to your needs. Whether you’re a student looking for convenience, a hostel administrator seeking efficiency, or a cafeteria staff member aiming for better management, Meal Mate is here to transform the way food is ordered and served.
                    Let’s make hostel dining smarter, faster, and more enjoyable—together!</p>
                <p>📩 Have questions or suggestions? Contact us at <a href="info@mealmate.com">info@mealmate.com</a></p>
                <div className="icon" style={{ display: 'flex', gap: '20px',justifyContent: 'center' }}>
                    <img src={facebookd} alt="Meal Mate" />
                    <img src={twitter} alt="Meal Mate" />
                    <img src={linkedin} alt="Meal Mate" />
                </div>
            </section>
        

    </div>
    </div>
  )
}

export default AboutMealMate