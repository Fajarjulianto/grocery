export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF8F3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B85C38] mx-auto mb-4"></div>
        <p className="text-[#B85C38] font-semibold">Loading...</p>
      </div>
    </div>
  );
}
