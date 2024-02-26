import React from 'react';
import { Popup } from 'react-leaflet';

const FullScreenPopup = ({ marker, onClose }) => {
  return (
    <Popup>
      <div className="full-screen-popup">
        <button onClick={onClose}>Close</button>
        <h2>{marker}</h2>
        <p>{marker.description}</p>
      </div>
    </Popup>
  );
};

export default FullScreenPopup;
