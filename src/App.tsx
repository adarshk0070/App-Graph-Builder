import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AppGraphBuilder } from '@/pages/AppGraphBuilder';
import { useAppStore } from '@/store/appStore';

function App() {
  const theme = useAppStore((state) => state.theme);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <AppGraphBuilder />
      </div>
    </QueryClientProvider>
  );
}

export default App;
