import Link from 'next/link';

// A single global 404 for the static export. Keep it self-contained (it renders
// outside the [locale] shell).
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white hover:bg-primary-700">
        Go home
      </Link>
    </div>
  );
}
