import ReactDOM from 'react-dom/client'
import AgoraRTC, { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react"
import { RouterProvider } from 'react-router-dom';
import routes from './routes/route';
import './style/index.css'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AgoraRTCProvider client={client}>
      <RouterProvider router={routes} />
    </AgoraRTCProvider>
  </QueryClientProvider>

)
