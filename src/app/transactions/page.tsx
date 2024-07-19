import SideNavbar from '@/components/SideNavbar';
import React from 'react';

const Transactions = () => {
  return (
    <div className="min-h-screen flex">
    <SideNavbar />
    <div className="p-8 w-full">
    <div className="transactions p-4">
      <h1>Transactions</h1>
      {/* Liste des transactions */}
    </div></div></div>
  );
};

export default Transactions;