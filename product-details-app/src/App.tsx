import React from "react";
import GlobalStyle from "./styles/global"
const Shell:  React.FC = React.lazy(() => import("shell/Shell"))

function App() {
  return (
    <React.Suspense fallback={<LoadingShell />}>
      <GlobalStyle/>
      <Shell />
    </React.Suspense>
  );
}

function LoadingShell() {
  return <div>Loading Shell...</div>;
}

export default App;