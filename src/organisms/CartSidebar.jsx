import React from 'react';
import CartItem from '../molecules/CartItem';
import Button from '../atoms/Button';

export default function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800">Mi Carrito</h3>
            <button onClick={onClose} className="text-3xl hover:text-gray-600">×</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 p-8">Tu carrito está vacío</p>
            ) : (
              cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))
            )}
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="text-2xl font-bold text-center mb-4">
              Total: ${total.toLocaleString()} CLP
            </div>
            <Button 
              onClick={onCheckout}
              variant="secondary"
              className="w-full"
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}