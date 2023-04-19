import '@/styles/globals.css'
import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Provider } from 'react-redux';
import store from '@/store';
import Navigation from '@/components/Navigation/Navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setIsDarkMode(storedDarkMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ConfigProvider theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
        <div className="App">
          <Navigation handleClick={handleClick}>
            <Component {...pageProps} />
          </Navigation>
        </div>
      </ConfigProvider>
    </Provider>
  );
}
