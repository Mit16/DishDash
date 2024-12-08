// src/DeliveryProcess.js
import React from "react";

const DeliveryProcess = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">How It Works</h1>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">1. Log In</h2>
          <p>
            Get on the road and log in to the Driver app to begin receiving
            delivery requests.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">2. Deliver Orders</h2>
          <p>
            Suggested navigation and information from restaurants and your
            customers is provided in the app to help deliveries run smoothly.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">3. Earn Money</h2>
          <p>You can track your earnings and cash out daily or weekly.</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProcess;
