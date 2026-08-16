import type { Metadata } from 'next';
import { Suspense } from 'react';
import MathsTableWorksheet from '../../../../components/MathsTableWorksheet';

export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ table: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ table: string }> }): Promise<Metadata> {
  const { table } = await params;
  return {
    title: `Table of ${table}`,
    description: `Practice the multiplication table of ${table}.`,
    alternates: { canonical: `/maths/tables/${table}` },
  };
}

export default async function MathsTableDetailPage({ params }: { params: Promise<{ table: string }> }) {
  const { table } = await params;
  return (
    <Suspense>
      <MathsTableWorksheet table={Number(table)} />
    </Suspense>
  );
}
