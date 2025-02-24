import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Record {
  id: number;
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  status: string;
  errors: {
    [key: string]: {
      message: string;
      severity: string;
    };
  };
}

interface DataReviewTableProps {
  records: Record[];
}

const DataReviewTable: React.FC<DataReviewTableProps> = ({ records }) => {
  // Function to get cell error indication
  const getCellStyle = (field: string, record: Record) => {
    if (record.errors[field]) {
      return record.errors[field].severity === 'critical'
        ? 'border-l-2 border-l-red-500'
        : 'border-l-2 border-l-yellow-500';
    }
    return '';
  };

  return (
    <Card className='w-full bg-white shadow-lg rounded-xl'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-6'>
        <CardTitle className='text-xl font-semibold text-gray-900'>
          Data Review
        </CardTitle>
      </CardHeader>
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
                <tr
                  key={record.id}
                  className='hover:bg-gray-50 transition-colors duration-150 ease-in-out'
                >
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {record.id}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-gray-900 ${getCellStyle(
                      'name',
                      record
                    )}`}
                  >
                    <div className='group relative'>
                      {record.name}
                      {record.errors.name && (
                        <div className='absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded px-2 py-1 -mt-8 ml-4'>
                          {record.errors.name.message}
                        </div>
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-gray-900 ${getCellStyle(
                      'email',
                      record
                    )}`}
                  >
                    <div className='group relative'>
                      {record.email}
                      {record.errors.email && (
                        <div className='absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded px-2 py-1 -mt-8 ml-4'>
                          {record.errors.email.message}
                        </div>
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-gray-900 ${getCellStyle(
                      'street',
                      record
                    )}`}
                  >
                    {record.street || '-'}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {record.city}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-gray-900 ${getCellStyle(
                      'zipcode',
                      record
                    )}`}
                  >
                    {record.zipcode || '-'}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm text-gray-900 ${getCellStyle(
                      'phone',
                      record
                    )}`}
                  >
                    {record.phone || '-'}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'active'
                          ? 'bg-green-50 text-green-800'
                          : record.status === 'pending'
                          ? 'bg-yellow-50 text-yellow-800'
                          : 'bg-gray-50 text-gray-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataReviewTable;
