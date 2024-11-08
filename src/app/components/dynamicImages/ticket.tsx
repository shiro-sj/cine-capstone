import React from 'react';

export const Ticket = () => {
  return (
    <div style={styles.container}>
      <svg width="100%" height="300" style={styles.svg}>
        <defs>
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0080" />
            <stop offset="20%" stopColor="#ff00ff" />
            <stop offset="40%" stopColor="#00ffff" />
            <stop offset="60%" stopColor="#00ff00" />
            <stop offset="80%" stopColor="#ffff00" />
            <stop offset="100%" stopColor="#ff0080" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#shine)" />
      </svg>

      <div style={styles.ticketContent}>
        <div style={styles.avatarContainer}>
          <img
            src="https://avatars.githubusercontent.com/u/13105222?v=4"
            alt="JM Santos"
            style={styles.avatar}
          />
          <div style={styles.nameContainer}>
            <div style={styles.name}>JM Santos</div>
            <div style={styles.username}>@jmaicaaan</div>
          </div>
        </div>
        <div style={styles.eventDetails}>
          <div style={styles.eventName}>NEXT.js</div>
          <div style={styles.eventDate}>CONF OCTOBER 27, 2020</div>
          <div style={styles.eventLocation}>ONLINE</div>
        </div>
        <div style={styles.ticketNumber}>
          № 010091
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '100%',
    height: '300px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    fontFamily: 'Arial, sans-serif'
  },
  svg: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0
  },
  ticketContent: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    right: '3px',
    bottom: '3px',
    backgroundColor: 'black',
    borderRadius: '13px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '12px'
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  username: {
    fontSize: '16px'
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  eventName: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  eventDate: {
    fontSize: '24px'
  },
  eventLocation: {
    fontSize: '20px'
  },
  ticketNumber: {
    alignSelf: 'flex-end',
    fontSize: '24px',
    fontWeight: 'bold'
  }
};