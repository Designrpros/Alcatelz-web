// src/lib/cloudkit.ts
import { Container } from '@/types/cloudkit';

let cachedContainer: Container | null = null;

export async function configureCloudKit(): Promise<Container> {
  if (typeof window === 'undefined') {
    throw new Error('CloudKit is only available in the browser');
  }

  if (!window.CloudKit) {
    console.log('Loading CloudKit JS...');
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.apple-cloudkit.com/ck/2/cloudkit.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load CloudKit JS'));
      document.head.appendChild(script);
    });
    console.log('CloudKit JS loaded');
  }

  if (!cachedContainer) {
    const config = {
      containers: [
        {
          containerIdentifier: 'iCloud.Alcatelz',
          apiTokenAuth: {
            apiToken: process.env.NEXT_PUBLIC_CLOUDKIT_API_TOKEN || 'ed6919a10c09286612ae4d1ce68004f409039f320ee5540735ed4b149625443c',
            persist: true,
            signInButton: {
              id: 'apple-sign-in-button',
              theme: 'black',
            },
            signOutButton: {
              id: 'apple-sign-out-button',
              theme: 'black',
            },
          },
          environment: 'development',
        },
      ],
    } as any;

    try {
      const cloudKitInstance = window.CloudKit.configure(config);
      if (!cloudKitInstance || !cloudKitInstance._containers || cloudKitInstance._containers.length === 0) {
        throw new Error('CloudKit configuration failed: No containers returned');
      }
      cachedContainer = cloudKitInstance._containers[0];
      console.log('CloudKit Container:', cloudKitInstance);
      console.log('Container Properties:', Object.keys(cloudKitInstance));
      console.log('Containers Array:', cloudKitInstance._containers);
      console.log('First Container:', cachedContainer);
      console.log('First Container Methods:', cachedContainer ? Object.keys(cachedContainer) : 'No container');
      console.log('Public Database:', cachedContainer?.publicCloudDatabase);
      console.log('Window.CloudKit Methods:', Object.keys(window.CloudKit));
    } catch (error) {
      console.error('Failed to configure CloudKit:', error);
      throw error;
    }
  }

  if (!cachedContainer) {
    throw new Error('Cached container is null after configuration');
  }
  return cachedContainer;
}

export async function signInToCloudKit(): Promise<void> {
  const container = await configureCloudKit();
  try {
    console.log('Setting up authentication...');
    const authResult = await container.setUpAuth();
    if (!authResult) {
      throw new Error('setUpAuth returned null or undefined');
    }
    console.log('Auth Result:', authResult);
    if (!authResult.isLoggedIn) {
      console.log('User not authenticated. Please use the iCloud sign-in button.');
    } else {
      console.log('User authenticated successfully');
    }
  } catch (err) {
    console.error('Authentication Error:', err);
    throw err;
  }
}