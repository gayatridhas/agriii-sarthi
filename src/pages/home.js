// src/pages/home.js
import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Welcome to Agri-Saarthi</h2>
          <p>Your digital companion for modern farming. Get crop recommendations, disease detection, irrigation advice, and more!</p>
          <a href="#features" className="btn">Explore Features</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Crop Recommendation</h3>
              <p>Get personalized crop suggestions based on your soil type, climate, and market trends.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bug"></i>
              </div>
              <h3>Disease Detection</h3>
              <p>Upload images of your crops to detect diseases and get treatment solutions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Chatbot</h3>
              <p>Get instant answers to your farming questions with our intelligent chatbot.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h3>Irrigation Advice</h3>
              <p>Optimize your water usage with smart irrigation recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Farmers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Agri-Saarthi helped me increase my crop yield by 30% with their recommendations!"</p>
                <div className="testimonial-author">
                  <h4>Rajesh Kumar</h4>
                  <p>Farmer from Punjab</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The disease detection feature saved my entire tomato crop from blight."</p>
                <div className="testimonial-author">
                  <h4>Priya Singh</h4>
                  <p>Farmer from Maharashtra</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The irrigation advice helped me reduce water usage by 40% while improving yield."</p>
                <div className="testimonial-author">
                  <h4>Amit Sharma</h4>
                  <p>Farmer from Uttar Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Farmers Connected</p>
            </div>
            <div className="stat-item">
              <h3>120+</h3>
              <p>Crop Varieties</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to transform your farming experience?</h2>
          <p>Join thousands of farmers who are already benefiting from Agri-Saarthi</p>
          <button className="btn btn-large">Get Started Today</button>
        </div>
      </section>
    </div>
  );
};

export default Home;