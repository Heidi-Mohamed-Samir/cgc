import React, { useState } from 'react';
import { getUserPurchases } from '../services/purchaseService';

interface Purchase {
  id: number;
  product: {
    name: string;
  };
  quantity: number;
  purchaseDate: string;
  totalAmount: number;
}

const PurchaseList: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const fetchPurchases = async () => {
    try {
      const data = await getUserPurchases(userId);
      setPurchases(data);
    } catch (error) {
      alert('فشل في تحميل المشتريات.');
    }
  };

  return (
    <div>
      <h2>سجل المشتريات</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button onClick={fetchPurchases}>تحميل</button>

      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>
            المنتج: {purchase.product?.name || 'غير معروف'} | الكمية: {purchase.quantity} | التاريخ: {purchase.purchaseDate} | المبلغ: {purchase.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;