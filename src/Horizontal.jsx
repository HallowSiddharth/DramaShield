import React from 'react';
import './Horizontal.css';
import { FaShieldAlt, FaTrashAlt, FaClock } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <div className="horizontal">
      <div className='features-section'>
        <div className='feature-item'>
          <FaShieldAlt className='feature-icon' />
          <h4 className='feature-title'>Effortless Tweet Management</h4>
          <p className='feature-description'>
            Easily manage your timeline by blocking tweets from specific users, ensuring a drama-free Twitter experience.
          </p>
        </div>
        <div className='feature-item'>
          <FaTrashAlt className='feature-icon' />
          <h4 className='feature-title'>Real-Time Filtering</h4>
          <p className='feature-description'>
            Enjoy a cleaner timeline with our automatic tweet deletion feature, which refreshes every few seconds to handle dynamic updates.
          </p>
        </div>
        <div className='feature-item'>
          <FaClock className='feature-icon' />
          <h4 className='feature-title'>Quick and Easy Unblocking</h4>
          <p className='feature-description'>
            Unlike traditional blocking methods, unblocking users is as simple as clicking a checkbox, putting you back in control of your feed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
