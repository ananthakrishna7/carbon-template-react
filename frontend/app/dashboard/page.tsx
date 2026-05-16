'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Button
} from '@carbon/react';
import { UserAvatar, Logout } from '@carbon/icons-react';
import { api } from '../../api';

interface DashboardData {
  id: string;
  name: string;
  status: string;
  metric: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get('/api/dashboard/data');
        const formattedData = result.map((item: any) => ({
          ...item,
          id: item.id.toString(),
        }));
        setData(formattedData);
      } catch (err: any) {
        setError('Failed to load dashboard data. Ensure backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const headers = [
    { key: 'name', header: 'Project Name' },
    { key: 'status', header: 'Status' },
    { key: 'metric', header: 'Metric' },
  ];

  return (
    <div>
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="end">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Logout" tooltipAlignment="end" onClick={handleLogout}>
            <Logout size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <main style={{ marginTop: '3rem', padding: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Dashboard Overview</h1>

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable rows={data} headers={headers}>
            {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
              <TableContainer title="Projects Data">
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })} key={header.key}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow {...getRowProps({ row })} key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        )}
      </main>
    </div>
  );
}
