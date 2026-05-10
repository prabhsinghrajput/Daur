"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './Account.module.css';
import { 
  FiShoppingBag, 
  FiMapPin, 
  FiUser, 
  FiLogOut 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { id: 'orders', label: 'Order history', icon: <FiShoppingBag /> },
  { id: 'address', label: 'Shipping Address', icon: <FiMapPin /> },
  { id: 'account', label: 'Account details', icon: <FiUser /> },
  { id: 'logout', label: 'Log out', icon: <FiLogOut /> },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'John Doe', address: '123 Luxury Avenue, Suite 404', city: 'Fashion City, FC 90210', isDefault: true },
    { id: 2, name: 'John Doe', address: '456 Trend Blvd', city: 'Style Town, ST 12345', isDefault: false },
  ]);

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const addNewAddress = () => {
    const newAddr = {
      id: Date.now(),
      name: 'John Doe',
      address: 'New Address Street',
      city: 'New City',
      isDefault: false
    };
    setAddresses([...addresses, newAddr]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <p className={styles.emptyState}>You haven't placed any orders yet. Start shopping to see your history!</p>;
      case 'address':
        return (
          <div className={styles.addressSection}>
            <div className={styles.addressHeader}>
              <h2>Saved Addresses</h2>
              <button className={styles.addBtn} onClick={addNewAddress}>+ Add New</button>
            </div>
            <div className={styles.detailsGrid}>
              {addresses.map((addr) => (
                <div key={addr.id} className={`${styles.detailCard} ${addr.isDefault ? styles.activeCard : ''}`}>
                  {addr.isDefault && <span className={styles.currentBadge}>Current</span>}
                  <h3>{addr.name}</h3>
                  <p>{addr.address}</p>
                  <p>{addr.city}</p>
                  <div className={styles.cardActions}>
                    {!addr.isDefault && (
                      <button className={styles.setBtn} onClick={() => handleSetDefault(addr.id)}>Set as Current</button>
                    )}
                    <button className={styles.editBtn}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'account':
        return (
          <div className={styles.accountForm}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" defaultValue="John Doe" />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" defaultValue="john@example.com" />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <button className={styles.saveBtn}>Save Changes</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.accountPage}>
      <Navbar />
      
      <div className={styles.mainContainer}>
        <aside className={styles.sidebar}>
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.sidebarItem} ${activeTab === item.id ? styles.activeItem : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </aside>

        <section className={styles.contentArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
