import React, { useState, useEffect, useRef } from 'react';
import { TableRow } from './TableRow';
import { Record } from '@/src/types';
import { Header } from './Header';

interface DataReviewTableProps {
  records: Record[];
}

const DataReviewTable: React.FC<DataReviewTableProps> = ({ records }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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

  const handleRowClick = (record: Record) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDialogOpen]);

  // Helper function to get severity class for error badges
  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Check if record has any errors
  const hasErrors = (record: Record) => {
    return record.errors && Object.keys(record.errors).length > 0;
  };

  return (
    <div className='w-full bg-white shadow-lg rounded-xl'>
      <Header recordCount={records.length} handleExport={handleExport} />
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
            <TableRow
              key={record.id}
              record={record}
              onClick={() => handleRowClick(record)}
            />
          ))}
        </tbody>
      </table>

      {isDialogOpen && selectedRecord && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            ref={dialogRef}
            className='bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in'
          >
            <div className='bg-blue-600 p-6 text-white'>
              <h2 className='text-xl font-semibold'>
                Record Details: {selectedRecord.name}
              </h2>
            </div>

            <div className='p-6'>
              <div className='space-y-5'>
                <div className='flex items-center'>
                  <div className='w-24 text-sm font-medium text-gray-400'>
                    ID
                  </div>
                  <div className='text-gray-800 font-medium'>
                    {selectedRecord.id}
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className='w-24 text-sm font-medium text-gray-400'>
                    Email
                  </div>
                  <div className='text-gray-800 break-all'>
                    {selectedRecord.email}
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-24 text-sm font-medium text-gray-400'>
                    Address
                  </div>
                  <div className='text-gray-800'>
                    {selectedRecord.street}
                    <br />
                    {selectedRecord.city}, {selectedRecord.zipcode}
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className='w-24 text-sm font-medium text-gray-400'>
                    Phone
                  </div>
                  <div className='text-gray-800'>{selectedRecord.phone}</div>
                </div>

                <div className='flex items-center'>
                  <div className='w-24 text-sm font-medium text-gray-400'>
                    Status
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        selectedRecord.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : selectedRecord.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {selectedRecord.status}
                    </span>
                  </div>
                </div>

                {/* Error Summary Section */}
                {hasErrors(selectedRecord) && (
                  <div className='mt-6 pt-5 border-t border-gray-100'>
                    <h3 className='text-lg font-medium text-gray-900 mb-3'>
                      Error Summary
                    </h3>
                    <div className='space-y-3'>
                      {Object.entries(selectedRecord.errors).map(
                        ([field, error]) => (
                          <div
                            key={field}
                            className='bg-gray-50 p-3 rounded-md'
                          >
                            <div className='flex justify-between items-start'>
                              <span className='text-sm font-medium text-gray-700 capitalize'>
                                {field}
                              </span>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityClass(
                                  error.severity
                                )}`}
                              >
                                {error.severity}
                              </span>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>
                              {error.message}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='border-t border-gray-100 p-4 bg-gray-50 flex justify-end'>
              <button
                onClick={closeDialog}
                className='px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md border border-gray-200 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataReviewTable;
