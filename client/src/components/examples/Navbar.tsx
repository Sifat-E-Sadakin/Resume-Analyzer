import Navbar from '../Navbar';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function NavbarExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
    </QueryClientProvider>
  );
}
