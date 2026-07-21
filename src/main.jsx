import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import idID from 'antd/locale/id_ID'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      locale={idID}
      theme={{
        token: {
          colorPrimary: '#008cfd',
          colorInfo: '#04bbe7',
          colorSuccess: '#27c66d',
          colorText: '#081630',
          colorTextSecondary: '#5f6d80',
          colorBorder: '#dce4ea',
          colorBgLayout: '#f6f8fa',
          borderRadius: 4,
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, 'Noto Sans', sans-serif",
          motionDurationFast: '0.1s',
          motionDurationMid: '0.2s',
          motionDurationSlow: '0.3s',
        },
        components: {
          Button: {
            primaryColor: '#081630',
            fontWeight: 600,
            controlHeightLG: 52,
            paddingInlineLG: 24,
            primaryShadow: 'none',
          },
          Collapse: {
            headerBg: 'transparent',
            contentBg: 'transparent',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
