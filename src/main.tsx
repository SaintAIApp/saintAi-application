import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistStore } from "redux-persist";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { wagmiConfig } from "./utils/wagmi";
import SolanaProvider from "./provider/SolanaProvider";

const persister = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loader />}>
    <SolanaProvider>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <PersistGate persistor={persister}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </WagmiConfig>
    </SolanaProvider>
  </Suspense>
);
