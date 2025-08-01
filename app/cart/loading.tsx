export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-primary font-semibold">Loading...</p>
      </div>
    </div>
  );
}
