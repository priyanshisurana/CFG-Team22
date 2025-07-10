// Directory: app/
// This creates separate pages for each Flask API route.
// We'll keep a minimal, friendly layout for demo clarity.

// ---------- File: app/page.tsx ----------
export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Flask API Demo Index</h1>
      <ul className="list-disc ml-4">
        <li><a className="text-blue-600 underline" href="/ping">Ping</a></li>
        <li><a className="text-blue-600 underline" href="/hello">Hello</a></li>
        <li><a className="text-blue-600 underline" href="/tasks">Tasks</a></li>
        <li><a className="text-blue-600 underline" href="/session">Session</a></li>
        <li><a className="text-blue-600 underline" href="/download">File Download</a></li>
        <li><a className="text-blue-600 underline" href="/redirect">Redirect</a></li>
        <li><a className="text-blue-600 underline" href="/custom-response">Custom Response</a></li>
      </ul>
    </main>
  );
}
