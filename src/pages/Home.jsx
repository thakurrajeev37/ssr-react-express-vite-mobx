import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../stores/StoreContext.jsx';
import { useHomeStore } from '../stores/rootStores.js';

const Home = observer(function Home() {
  const { app } = useStore();
  const homeStore = useHomeStore();
  // Greeting & visits now initialized on server; no client effect needed
  return (
  <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page.</p>
  <img src="/logo.svg" alt="App Logo" width="120" height="120" style={{ display: 'block', marginBottom: 16 }} />
  <p><strong>Message:</strong> {app.message}</p>
  <p><strong>Time:</strong> {app.time}</p>
  <p><strong>Greeting:</strong> {homeStore.greeting}</p>
  <p><strong>Visits (SSR initialized):</strong> {homeStore.visits}</p>
    </div>
  );
});

export default Home;
