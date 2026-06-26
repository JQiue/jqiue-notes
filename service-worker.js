
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  try {
    await self.clients.claim();
    await self.registration.unregister();

    const cachePatterns = [].map((pattern) => new RegExp(pattern));

    const cacheKeys = await self.caches.keys();
    const deletionPromises = cacheKeys
      .filter((name) => !cachePatterns.length || cachePatterns.some((pattern) => pattern.test(name)))
      .map((name) => self.caches.delete(name));
    await Promise.all(deletionPromises);

    const clients = await self.clients.matchAll({ type: 'window' });

    clients.forEach((client) => {
      client.navigate(client.url);
    });
  } catch (error) {
    console.error('Error during deactivation and cleanup:', error);
  }
});
