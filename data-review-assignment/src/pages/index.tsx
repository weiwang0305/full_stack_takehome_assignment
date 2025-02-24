// pages/index.tsx
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import DataReviewTable from '../components/DataTable';
import { Record } from '../types';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const getServerSideProps = (async () => {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();
  const records = data.records;
  return { props: { records } };
}) satisfies GetServerSideProps<{ records: Record[] }>;

export default function Home({
  records,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div
      className={`${openSans.variable} font-open-sans fixed w-[100vw] h-[100vh]`}
    >
      <DataReviewTable records={records} />
    </div>
  );
}
