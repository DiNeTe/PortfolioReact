import AppRouter from "./routes/AppRouter";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { inject } from '@vercel/analytics';

// Inject the Vercel Analytics script
inject();

const App: React.FC = () => {
  return (
    <div className="app">
      <main>
        <AppRouter />
        <SpeedInsights />
      </main>
    </div>
  );
};

export default App;
