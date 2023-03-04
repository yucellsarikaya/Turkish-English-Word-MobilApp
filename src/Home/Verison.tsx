import React, { useState } from 'react';

function Verison() {
  const [showMobileView, setShowMobileView] = useState(false);

  const toggleMobileView = () => {
    setShowMobileView(!showMobileView);
  };

  return (
    <div className="App">
      {/* Mobile View Button */}
      <button className="mobile-view-button" onClick={toggleMobileView}>
        {showMobileView ? 'Close Mobile View' : 'Open Mobile View'}
      </button>

      {/* Desktop View */}
      {!showMobileView && (
        <div className="desktop-view">
          {/* desktop view content */}
        </div>
      )}

      {/* Mobile View */}
      {showMobileView && (
        <div className="mobile-view">
          {/* mobile view content */}
        </div>
      )}
    </div>
  );
}

export default Verison;
