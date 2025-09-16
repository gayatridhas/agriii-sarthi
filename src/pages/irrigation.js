// src/pages/irrigation.js
import React, { useState, useEffect } from 'react';
import './irrigation.css';

const Irrigation = () => {
  const [sensorData, setSensorData] = useState({
    moisture: 65,
    temperature: 28,
    rainfall: 15,
    humidity: 72,
    pH: 6.8
  });
  const [selectedCrop, setSelectedCrop] = useState('');
  const [irrigationSchedule, setIrrigationSchedule] = useState(null);
  const [manualControl, setManualControl] = useState({
    pump1: false,
    pump2: false,
    pump3: false
  });
  const [forecastData, setForecastData] = useState([]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        moisture: Math.max(10, Math.min(90, prev.moisture + (Math.random() * 2 - 1))),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() * 0.5 - 0.25))),
        rainfall: Math.max(0, Math.min(50, prev.rainfall + (Math.random() * 1 - 0.5))),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() * 1 - 0.5))),
        pH: Math.max(5.5, Math.min(8.5, prev.pH + (Math.random() * 0.1 - 0.05)))
      }));
    }, 5000);

    // Generate forecast data
    const generateForecast = () => {
      const days = ['Today', 'Tomorrow', 'Day after'];
      return days.map((day, i) => ({
        day,
        temperature: 28 + (i * 2),
        rainfall: Math.max(0, 10 + (Math.random() * 20 - 10)),
        humidity: 70 + (i * 5)
      }));
    };

    setForecastData(generateForecast());

    return () => clearInterval(interval);
  }, []);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
    generateIrrigationSchedule(e.target.value);
  };

  const generateIrrigationSchedule = (crop) => {
    // Simple irrigation logic based on crop type
    const schedules = {
      wheat: {
        frequency: "Every 4 days",
        duration: "30 minutes",
        amount: "2.5 cm",
        bestTime: "Early morning (5-7 AM)",
        method: "Sprinkler irrigation"
      },
      rice: {
        frequency: "Continuous",
        duration: "Constant",
        amount: "5-7 cm standing water",
        bestTime: "Anytime",
        method: "Flood irrigation"
      },
      cotton: {
        frequency: "Every 5-7 days",
        duration: "45 minutes",
        amount: "4 cm",
        bestTime: "Evening (6-8 PM)",
        method: "Drip irrigation"
      },
      sugarcane: {
        frequency: "Every 5 days",
        duration: "60 minutes",
        amount: "5 cm",
        bestTime: "Late night (10 PM-12 AM)",
        method: "Furrow irrigation"
      },
      tomato: {
        frequency: "Every 3 days",
        duration: "25 minutes",
        amount: "2 cm",
        bestTime: "Early morning (6-8 AM)",
        method: "Drip irrigation"
      }
    };

    setIrrigationSchedule(schedules[crop] || null);
  };

  const togglePump = (pump) => {
    setManualControl(prev => ({
      ...prev,
      [pump]: !prev[pump]
    }));
  };

  const getMoistureStatus = (level) => {
    if (level < 30) return { status: "Low", color: "#f44336", advice: "Immediate irrigation needed" };
    if (level < 60) return { status: "Moderate", color: "#FF9800", advice: "Irrigation recommended soon" };
    return { status: "Adequate", color: "#4CAF50", advice: "No irrigation needed" };
  };

  const moistureStatus = getMoistureStatus(sensorData.moisture);

  return (
    <div className="irrigation-page">
      <div className="container">
        <h2 className="page-title">Smart Irrigation System</h2>
        <p className="page-subtitle">Monitor soil conditions and optimize water usage for your crops</p>
        
        <div className="irrigation-content">
          <div className="main-content">
            {/* Sensor Data Section */}
            <div className="card">
              <h3>Real-time Sensor Data</h3>
              <div className="sensor-grid">
                <div className="sensor-item">
                  <div className="sensor-icon" style={{ backgroundColor: moistureStatus.color }}>
                    <i className="fas fa-tint"></i>
                  </div>
                  <div className="sensor-info">
                    <h4>Soil Moisture</h4>
                    <p className="sensor-value">{sensorData.moisture}%</p>
                    <p className="sensor-status" style={{ color: moistureStatus.color }}>
                      {moistureStatus.status} - {moistureStatus.advice}
                    </p>
                  </div>
                </div>
                
                <div className="sensor-item">
                  <div className="sensor-icon">
                    <i className="fas fa-thermometer-half"></i>
                  </div>
                  <div className="sensor-info">
                    <h4>Temperature</h4>
                    <p className="sensor-value">{sensorData.temperature}°C</p>
                    <p className="sensor-status">Optimal for most crops</p>
                  </div>
                </div>
                
                <div className="sensor-item">
                  <div className="sensor-icon">
                    <i className="fas fa-cloud-rain"></i>
                  </div>
                  <div className="sensor-info">
                    <h4>Rainfall</h4>
                    <p className="sensor-value">{sensorData.rainfall} mm</p>
                    <p className="sensor-status">Last 24 hours</p>
                  </div>
                </div>
                
                <div className="sensor-item">
                  <div className="sensor-icon">
                    <i className="fas fa-wind"></i>
                  </div>
                  <div className="sensor-info">
                    <h4>Humidity</h4>
                    <p className="sensor-value">{sensorData.humidity}%</p>
                    <p className="sensor-status">Moderate humidity level</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Irrigation Control Section */}
            <div className="card">
              <h3>Irrigation Control</h3>
              <div className="control-section">
                <div className="form-group">
                  <label htmlFor="crop-select">Select Crop</label>
                  <select 
                    id="crop-select" 
                    className="form-control"
                    value={selectedCrop}
                    onChange={handleCropChange}
                  >
                    <option value="">Select Crop</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="cotton">Cotton</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="tomato">Tomato</option>
                  </select>
                </div>
                
                {irrigationSchedule && (
                  <div className="schedule-card">
                    <h4>Recommended Irrigation Schedule</h4>
                    <div className="schedule-details">
                      <div className="schedule-item">
                        <i className="fas fa-history"></i>
                        <span>Frequency: {irrigationSchedule.frequency}</span>
                      </div>
                      <div className="schedule-item">
                        <i className="fas fa-clock"></i>
                        <span>Duration: {irrigationSchedule.duration}</span>
                      </div>
                      <div className="schedule-item">
                        <i className="fas fa-ruler"></i>
                        <span>Amount: {irrigationSchedule.amount}</span>
                      </div>
                      <div className="schedule-item">
                        <i className="fas fa-sun"></i>
                        <span>Best Time: {irrigationSchedule.bestTime}</span>
                      </div>
                      <div className="schedule-item">
                        <i className="fas fa-toolbox"></i>
                        <span>Method: {irrigationSchedule.method}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary">
                      <i className="fas fa-calendar-plus"></i> Add to Schedule
                    </button>
                  </div>
                )}
                
                <div className="manual-control">
                  <h4>Manual Control</h4>
                  <p>Override automated system for emergency control</p>
                  <div className="pump-controls">
                    <div className="pump-item">
                      <span>Pump 1 (North Field)</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={manualControl.pump1}
                          onChange={() => togglePump('pump1')}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="pump-status">
                        {manualControl.pump1 ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    
                    <div className="pump-item">
                      <span>Pump 2 (South Field)</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={manualControl.pump2}
                          onChange={() => togglePump('pump2')}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="pump-status">
                        {manualControl.pump2 ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    
                    <div className="pump-item">
                      <span>Pump 3 (East Field)</span>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={manualControl.pump3}
                          onChange={() => togglePump('pump3')}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="pump-status">
                        {manualControl.pump3 ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Water Usage Statistics */}
            <div className="card">
              <h3>Water Usage Statistics</h3>
              <div className="water-stats">
                <div className="stat-item">
                  <h4>This Month</h4>
                  <p className="stat-value">12,500 L</p>
                  <p className="stat-change down">-15% from last month</p>
                </div>
                <div className="stat-item">
                  <h4>Estimated Savings</h4>
                  <p className="stat-value">3,200 L</p>
                  <p className="stat-change up">With smart irrigation</p>
                </div>
                <div className="stat-item">
                  <h4>Cost Reduction</h4>
                  <p className="stat-value">₹ 1,250</p>
                  <p className="stat-change up">This season</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar">
            {/* Weather Forecast */}
            <div className="card">
              <h3>Weather Forecast</h3>
              <div className="forecast-list">
                {forecastData.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <span className="forecast-day">{day.day}</span>
                    <div className="forecast-temp">
                      <i className="fas fa-thermometer-half"></i>
                      {day.temperature}°C
                    </div>
                    <div className="forecast-rain">
                      <i className="fas fa-cloud-rain"></i>
                      {day.rainfall.toFixed(1)} mm
                    </div>
                    <div className="forecast-humidity">
                      <i className="fas fa-wind"></i>
                      {day.humidity}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Irrigation Tips */}
            <div className="card">
              <h3>Water Conservation Tips</h3>
              <div className="tips-list">
                <div className="tip-item">
                  <div className="tip-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <p>Water early in the morning to reduce evaporation</p>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">
                    <i className="fas fa-tint"></i>
                  </div>
                  <p>Use drip irrigation for row crops to save up to 50% water</p>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <p>Apply mulch around plants to retain soil moisture</p>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">
                    <i className="fas fa-ruler"></i>
                  </div>
                  <p>Regularly check for leaks in irrigation systems</p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="btn btn-outline">
                  <i className="fas fa-sliders-h"></i> System Settings
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-history"></i> Usage History
                </button>
                <button className="btn btn-primary">
                  <i className="fas fa-download"></i> Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;