// src/lib/hooks.ts
'use client';

import { useState, useEffect } from 'react';
import { configureCloudKit } from './cloudkit';

export function useCloudKitData(recordType: string = 'Block') {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const container = await configureCloudKit();
        console.log('Hook Container:', container);
        const response = await container.publicCloudDatabase.performQuery({
          recordType,
        });
        console.log('Query Response:', response);
        console.log('Records:', response.records);
        setRecords(response.records);
      } catch (err) {
        console.error('CloudKit Fetch Error:', err);
        setError('Failed to load data: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [recordType]);

  return { records, loading, error };
}