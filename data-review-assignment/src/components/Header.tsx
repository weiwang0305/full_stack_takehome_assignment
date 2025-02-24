import React from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  handleExport?: () => void;
  recordCount?: number;
  lastUpdated?: string | Date;
}

export const Header: React.FC<PageHeaderProps> = ({
  handleExport,
  recordCount = 0,
  lastUpdated = new Date(),
}) => {
  const formattedDate =
    typeof lastUpdated === 'string'
      ? lastUpdated
      : lastUpdated.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='px-6 py-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Data Review</h1>
            <p className='text-sm text-gray-500 mt-1'>
              Review and manage your customer data records
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center gap-2 text-xs text-gray-500 mb-4 md:mb-0'>
            <div className='flex items-center'>
              <span>Last updated: {formattedDate}</span>
            </div>
            <div className='h-4 w-px bg-gray-300 mx-2'></div>
            <div>
              <span>{recordCount} records</span>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
              onClick={handleExport}
            >
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
