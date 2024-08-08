import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";

import { FocusProvider } from "../stores/focus";

export default function AppProvider({ children }) {
  return (
    // <QueryClientProvider client={queryClient}>
      <FocusProvider>{children}</FocusProvider>
    // </QueryClientProvider>
  )
}
