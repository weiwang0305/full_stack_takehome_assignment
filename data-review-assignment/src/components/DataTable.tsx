import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TableRow } from './TableRow';
import { Record } from '@/src/types';
import { Header } from './Header';

interface DataReviewTableProps {
  records: Record[];
}

const DataReviewTable: React.FC<DataReviewTableProps> = ({ records }) => {
  const handleExport = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Street',
      'City',
      'Zipcode',
      'Phone',
      'Status',
    ];
    const csvContent = [
      headers.join(','),
      ...records.map((record) =>
        [
          record.id,
          record.name,
          record.email,
          record.street,
          record.city,
          record.zipcode,
          record.phone,
          record.status,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className='w-full bg-white shadow-lg rounded-xl'>
      <Header recordCount={records.length} handleExport={handleExport} />
      <CardContent className='px-1 pb-6'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Street
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  City
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Zipcode
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Phone
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {records.map((record) => (
                <TableRow record={record} key={record.id} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataReviewTable;
