import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredMenu, setFeaturedMenu] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, reviewsRes] = await Promise.all([
          api.get('/menu?category=Lunch'),
          api.get('/reviews')
        ]);
        
        setFeaturedMenu(menuRes.data.slice(0, 3));
        setReviews(reviewsRes.data.reviews?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Yummy Restaurant</h1>
          <p>Delicious food made with love and fresh ingredients</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">Order Now</Link>
            <Link to="/reservation" className="btn btn-outline">Book a Table</Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="featured-menu section">
        <div className="container">
          <h2>Featured Dishes</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="menu-grid">
              {featuredMenu.map((item) => (
                <div key={item._id} className="menu-card">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="menu-card-footer">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <Link to="/menu" className="btn btn-primary">View Menu</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <h2>What Our Customers Say</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="stars">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <p className="review-comment">"{review.comment}"</p>
                  <p className="review-author">- {review.userName || review.userId?.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta section">
        <div className="container">
          <h2>Ready to Enjoy Great Food?</h2>
          <p>Order now or make a reservation</p>
          <div className="cta-buttons">
            <Link to="/menu" className="btn btn-primary">Order Online</Link>
            <Link to="/reservation" className="btn btn-outline">Reserve Table</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
