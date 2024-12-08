// src/JoinZomato.js
import React from "react";

const StepsToAccountMaking = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Join FoodHub in 3 Easy Steps</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Step 1</h2>
          <p className="text-gray-600">Download the food delivery app.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Step 2</h2>
          <p className="text-gray-600">Complete online training.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Step 3</h2>
          <p className="text-gray-600">Start delivering & start earning.</p>
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default StepsToAccountMaking;
