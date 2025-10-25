// file: app/providers.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * A client component that sets up the QueryClientProvider for React Query.
 * It ensures that the QueryClient is only created once per component lifecycle.
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The provider component wrapping the children.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
