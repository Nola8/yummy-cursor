import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
      setTotalReviews(response.data.totalReviews || 0);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to submit a review');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', formData);
      alert('Review submitted successfully!');
      setFormData({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="reviews-page"><div className="container"><p>Loading reviews...</p></div></div>;
  }

  return (
    <div className="reviews-page">
      <div className="container">
        <h1>Customer Reviews</h1>

        <div className="reviews-summary">
          <div className="rating-display">
            <div className="average-rating">{averageRating.toFixed(1)}</div>
            <div className="stars-large">{'⭐'.repeat(Math.round(averageRating))}</div>
            <p>Based on {totalReviews} reviews</p>
          </div>
        </div>

        {isAuthenticated && (
          <div className="review-form-container">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label>Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows="4"
                  required
                  placeholder="Share your experience..."
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        <div className="reviews-list">
          <h2>All Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <h3>{review.userName || 'Anonymous'}</h3>
                  <div className="stars">{'⭐'.repeat(review.rating)}</div>
                </div>
                <p className="review-date">
                  {new Date(review.date || review.createdAt).toLocaleDateString()}
                </p>
                <p className="review-text">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
