import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Lunch',
    image: '',
    available: true
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'orders':
          const ordersRes = await api.get('/orders');
          setOrders(ordersRes.data);
          break;
        case 'reservations':
          const reservationsRes = await api.get('/reservations');
          setReservations(reservationsRes.data);
          break;
        case 'menu':
          const menuRes = await api.get('/menu');
          setMenuItems(menuRes.data);
          break;
        case 'contacts':
          const contactsRes = await api.get('/contact');
          setContacts(contactsRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      loadData();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    }
  };

  const handleUpdateReservationStatus = async (reservationId, status) => {
    try {
      await api.put(`/reservations/${reservationId}`, { status });
      loadData();
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Failed to update reservation');
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/menu/${editingItem._id}`, menuFormData);
      } else {
        await api.post('/menu', menuFormData);
      }
      setMenuFormData({
        name: '',
        description: '',
        price: '',
        category: 'Lunch',
        image: '',
        available: true
      });
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item');
    }
  };

  const handleEditMenu = (item) => {
    setEditingItem(item);
    setMenuFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available
    });
  };

  const handleDeleteMenu = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/menu/${itemId}`);
      loadData();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(r => r.status === 'pending').length
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            <span className="stat-sub">{stats.pendingOrders} pending</span>
          </div>
          <div className="stat-card">
            <h3>Reservations</h3>
            <p className="stat-number">{stats.totalReservations}</p>
            <span className="stat-sub">{stats.pendingReservations} pending</span>
          </div>
          <div className="stat-card">
            <h3>Menu Items</h3>
            <p className="stat-number">{menuItems.length}</p>
          </div>
          <div className="stat-card">
            <h3>Contact Messages</h3>
            <p className="stat-number">{contacts.length}</p>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'active' : ''}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={activeTab === 'reservations' ? 'active' : ''}
          >
            Reservations
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={activeTab === 'menu' ? 'active' : ''}
          >
            Menu Management
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={activeTab === 'contacts' ? 'active' : ''}
          >
            Contact Messages
          </button>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {activeTab === 'orders' && (
                <div className="admin-section">
                  <h2>Orders</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order._id}>
                            <td>{order._id.slice(-6)}</td>
                            <td>{order.userId?.name || order.userId?.email || 'N/A'}</td>
                            <td>{order.items?.length || 0} items</td>
                            <td>${order.totalPrice?.toFixed(2)}</td>
                            <td>
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div className="admin-section">
                  <h2>Reservations</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Guests</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map(reservation => (
                          <tr key={reservation._id}>
                            <td>{reservation.name}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.phone}</td>
                            <td>{new Date(reservation.date).toLocaleDateString()}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.guests}</td>
                            <td>
                              <select
                                value={reservation.status}
                                onChange={(e) => handleUpdateReservationStatus(reservation._id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="admin-section">
                  <h2>Menu Management</h2>
                  <form onSubmit={handleMenuSubmit} className="menu-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          value={menuFormData.name}
                          onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category *</label>
                        <select
                          value={menuFormData.category}
                          onChange={(e) => setMenuFormData({ ...menuFormData, category: e.target.value })}
                          required
                        >
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                          <option value="Drinks">Drinks</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={menuFormData.price}
                          onChange={(e) => setMenuFormData({ ...menuFormData, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description *</label>
                      <textarea
                        value={menuFormData.description}
                        onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
                        required
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={menuFormData.image}
                        onChange={(e) => setMenuFormData({ ...menuFormData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={menuFormData.available}
                          onChange={(e) => setMenuFormData({ ...menuFormData, available: e.target.checked })}
                        />
                        Available
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItem && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem(null);
                          setMenuFormData({
                            name: '',
                            description: '',
                            price: '',
                            category: 'Lunch',
                            image: '',
                            available: true
                          });
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    )}
                  </form>

                  <div className="menu-items-list">
                    <h3>Current Menu Items</h3>
                    <div className="menu-grid-admin">
                      {menuItems.map(item => (
                        <div key={item._id} className="menu-item-admin">
                          <img src={item.image} alt={item.name} />
                          <h4>{item.name}</h4>
                          <p>{item.category} - ${item.price.toFixed(2)}</p>
                          <div className="menu-item-actions">
                            <button onClick={() => handleEditMenu(item)} className="btn btn-outline">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteMenu(item._id)} className="btn btn-secondary">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="admin-section">
                  <h2>Contact Messages</h2>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map(contact => (
                          <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone || 'N/A'}</td>
                            <td>{contact.subject}</td>
                            <td>{contact.message.substring(0, 50)}...</td>
                            <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td>{contact.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
