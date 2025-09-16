import React, { useState } from 'react';
import './recommend.css';

const Recommend = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    region: '',
    season: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="recommend-page">
      <div className="container">
        <h2 className="page-title">Crop Recommendation</h2>
        
        <div className="card">
          <p>Enter your details below to get personalized crop recommendations:</p>
          <form>
            <div className="form-group">
              <label htmlFor="soil-type">Soil Type</label>
              <select 
                id="soil-type" 
                name="soilType"
                className="form-control"
                value={formData.soilType}
                onChange={handleChange}
              >
                <option value="">Select Soil Type</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="loamy">Loamy</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="region">Region</label>
              <select 
                id="region" 
                name="region"
                className="form-control"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="">Select Region</option>
                <option value="north">Northern India</option>
                <option value="south">Southern India</option>
                <option value="east">Eastern India</option>
                <option value="west">Western India</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="season">Season</label>
              <select 
                id="season" 
                name="season"
                className="form-control"
                value={formData.season}
                onChange={handleChange}
              >
                <option value="">Select Season</option>
                <option value="kharif">Kharif (Monsoon)</option>
                <option value="rabi">Rabi (Winter)</option>
                <option value="zaid">Zaid (Summer)</option>
              </select>
            </div>
            
            <button type="button" className="btn">Get Recommendations</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recommend;