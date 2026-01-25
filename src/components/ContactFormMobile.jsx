'use client';

import { useState } from 'react';

export default function ContactFormMobile({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    ideas: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop-mobile" onClick={onClose}></div>
      <div className="modal-mobile">
        <button className="close-btn-mobile" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="modal-header-mobile">
          <h2>Let's create something amazing</h2>
        </div>

        <form onSubmit={handleSubmit} className="form-mobile">
          <div className="form-group-mobile">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="input-mobile"
            />
          </div>

          <div className="form-group-mobile">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              className="input-mobile"
            />
          </div>

          <div className="form-group-mobile">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="input-mobile"
            />
          </div>

          <div className="form-group-mobile">
            <textarea
              id="ideas"
              name="ideas"
              value={formData.ideas}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your project..."
              className="textarea-mobile"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn-mobile">
            <span>Send Message</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
