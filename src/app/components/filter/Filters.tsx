'use client';

import React from 'react';

const Filters = () => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Filter by:</h3>
        
        <div className="space-y-8">
          {/* Budget Filter */}
          <div className=" p-4 rounded-lg  transition-colors">
            <h4 className="font-semibold mb-4 text-gray-700">Your Budget (per night)</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">$0 - $50</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">$50 - $100</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">$100 - $200</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">$200+</span>
              </label>
            </div>
          </div>

          {/* Popular Filters */}
          <div className=" p-4 rounded-lg transition-colors">
            <h4 className="font-semibold mb-4 text-gray-700">Popular Filters</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Free cancellation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Breakfast included</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Pool</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Spa</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Beach access</span>
              </label>
            </div>
          </div>

          {/* Property Type */}
          <div className=" p-4 rounded-lg transition-colors">
            <h4 className="font-semibold mb-4 text-gray-700">Property Type</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Hotels</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Resorts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Apartments</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Villas</span>
              </label>
            </div>
          </div>

          {/* Guest Rating */}
          <div className=" p-4 rounded-lg  transition-colors">
            <h4 className="font-semibold mb-4 text-gray-700">Guest Rating</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Excellent 9+</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Very Good 8+</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600 hover:text-blue-600">Good 7+</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;