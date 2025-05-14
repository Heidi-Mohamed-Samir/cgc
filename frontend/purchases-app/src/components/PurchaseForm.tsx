import React, { useState } from 'react';
import { buyProducts } from '../services/purchaseService';

const PurchaseForm: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [message, setMessage] = useState('');

  const handleBuy = async () => {
    try {
      await buyProducts(userId);
      setMessage('تم الشراء بنجاح!');
    } catch (error) {
      setMessage('حدث خطأ أثناء الشراء.');
    }
  };

  return (
    <div>
      <h2>شراء المنتجات</h2>
      <input
        type="number"
        placeholder="أدخل User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button onClick={handleBuy}>شراء</button>
      <p>{message}</p>
    </div>
  );
};

export default PurchaseForm;