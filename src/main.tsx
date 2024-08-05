import ReactDOM from "react-dom/client";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistStore } from "redux-persist";
import { Routes } from "./routes";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { wagmiConfig } from "./utils/wagmi";
import SolanaProvider from "./provider/SolanaProvider";
import { WagmiConfig } from "wagmi";

const persister = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loader />}>
    <SolanaProvider>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <PersistGate persistor={persister}>
            <Routes />
          </PersistGate>
        </Provider>
      </WagmiConfig>
    </SolanaProvider>
  </Suspense>
);
