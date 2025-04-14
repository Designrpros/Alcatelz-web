// src/types/cloudkit.d.ts
export interface CloudKitConfig {
    containers: {
      containerIdentifier: string;
      apiToken: string;
      environment: 'development' | 'production';
    }[];
    auth?: { // Optional auth config
      signIn?: { button?: boolean };
    };
  }
  
  export interface Database {
    performQuery(query: { recordType: string }): Promise<{ records: any[] }>;
    fetchRecords(query: { recordType: string }): Promise<{ records: any[] }>;
  }
  
  export interface Container {
    publicCloudDatabase: Database;
    privateCloudDatabase?: Database;
    setUpAuth(): Promise<{ isLoggedIn: boolean }>;
    signIn(): Promise<void>;
  }
  
  declare global {
    interface Window {
      CloudKit: {
        configure(config: CloudKitConfig): { _containers: Container[] };
        getDefaultContainer(): Container;
        signIn?(): Promise<void>; // Optional top-level signIn
        Auth?: { // Optional Auth object
          signIn(): Promise<void>;
        };
      };
    }
  }