import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <div className="app">
      <main>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
