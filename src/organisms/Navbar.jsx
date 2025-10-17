import React from 'react';

export default function Navbar({ cartCount, onToggleCart, onToggleLogin }) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">🌱 HuertoHogar</h1>
          <div className="flex items-center gap-6">
            <button onClick={onToggleCart} className="relative text-2xl hover:text-green-600">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={onToggleLogin} className="text-2xl hover:text-green-600">
              👤
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}