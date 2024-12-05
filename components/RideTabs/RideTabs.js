import React, { useState } from 'react';
import styles from './RideTabs.module.css';
import RideCard from '@/components/RideCard/RideCard';

export default function RideTabs({ ongoingRides, upcomingRides, pastRides }) {
  const [activeTab, setActiveTab] = useState('history');

  const renderRides = () => {
    switch (activeTab) {
      case 'inProgress':
        return ongoingRides.length > 0 ? (
          ongoingRides.map((ride) => <RideCard key={ride.carpoolId} ride={ride} />)
        ) : (
          <p className={styles.noRides}>No rides in progress</p>
        );
      case 'upcoming':
        return upcomingRides.length > 0 ? (
          upcomingRides.map((ride) => <RideCard key={ride.carpoolId} ride={ride} />)
        ) : (
          <p className={styles.noRides}>No upcoming rides</p>
        );
      case 'history':
        return pastRides.length > 0 ? (
          pastRides.map((ride) => <RideCard key={ride.carpoolId} ride={ride} />)
        ) : (
          <p className={styles.noRides}>No ride history</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'inProgress' ? styles.active : ''}`}
          onClick={() => setActiveTab('inProgress')}
        >
          Rides in Progress
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.active : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Rides
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Ride History
        </button>
      </div>
      <div className={styles.rideList}>{renderRides()}</div>
    </div>
  );
}