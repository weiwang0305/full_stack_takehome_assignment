import { Record } from '@/src/types';

interface TableRowProps {
  record: Record;
  onClick: () => void;
}

export const TableRow = ({ record, onClick }: TableRowProps) => {
  const getCellStyle = (field: string, record: Record) => {
    console.log(record.errors);
    if (record.errors[field]) {
      return record.errors[field].severity === 'critical'
        ? 'border-l-2 border-l-red-500'
        : 'border-l-2 border-l-yellow-500';
    }
    return 'border-l-2 border-l-green-500';
  };

  return (
    <tr
      className='hover:bg-gray-50 transition-colors duration-150 ease-in-out z-50'
      onClick={onClick}
    >
      <td className='px-4 py-4 text-sm text-gray-900'>{record.id}</td>
      <td
        className={`px-4 py-4 text-sm text-gray-900 ${getCellStyle(
          'name',
          record
        )}`}
      >
        <div className='group relative'>
          {record.errors.name && (
            <div className='absolute w-[120px] z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded -translate-y-12 -translate-x-12 p-2'>
              {record.errors.name.message}
            </div>
          )}
          {record.name || '-'}
        </div>
      </td>
      <td
        className={`px-6 text-sm atext-gray-900 ${getCellStyle(
          'email',
          record
        )}`}
      >
        <div className='group relative'>
          {record.errors.email && (
            <div className='absolute w-[140px] z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded -translate-y-12 -translate-x-2 p-2'>
              {record.errors.email.message}
            </div>
          )}
          {record.email || '-'}
        </div>
      </td>
      <td
        className={`px-6 text-sm text-gray-900 ${getCellStyle(
          'street',
          record
        )}`}
      >
        <div className='group relative'>
          {record.errors.street && (
            <div className='absolute w-[120px] z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded -translate-y-12 -translate-x-4 p-2'>
              {record.errors.street.message}
            </div>
          )}
          {record.street || '-'}
        </div>
      </td>
      <td className='px-6 text-sm text-gray-900'>{record.city}</td>
      <td
        className={`px-6 text-sm text-gray-900 ${getCellStyle(
          'zipcode',
          record
        )}`}
      >
        <div className='group relative'>
          {record.errors.zipcode && (
            <div className='absolute w-[150px] z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded -translate-y-12 -translate-x-12 p-2'>
              {record.errors.zipcode.message}
            </div>
          )}
          {record.zipcode || '-'}
        </div>
      </td>
      <td
        className={`px-6 text-sm text-gray-900 ${getCellStyle(
          'phone',
          record
        )}`}
      >
        <div className='group relative'>
          {record.errors.phone && (
            <div className='absolute w-[150px] z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded -translate-y-12 -translate-x-4 p-2'>
              {record.errors.phone.message}
            </div>
          )}
          {record.phone || '-'}
        </div>
      </td>
      <td className='px-6'>
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
  );
};
