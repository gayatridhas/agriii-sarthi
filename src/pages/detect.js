import React, { useState } from 'react';
import './detect.css';

const Detect = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="detect-page">
      <div className="container">
        <h2 className="page-title">Disease Detection</h2>
        
        <div className="card">
          <p>Upload an image of your crop to detect diseases:</p>
          <div className="form-group">
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
          
          <button type="button" className="btn">Detect Disease</button>
        </div>
      </div>
    </div>
  );
};

export default Detect;