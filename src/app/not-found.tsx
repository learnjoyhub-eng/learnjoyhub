import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <Link href="/" style={{ color: '#11998e', fontWeight: 'bold' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
