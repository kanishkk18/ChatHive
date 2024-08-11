import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import Auth from "@/pages/auth";
import Welcomepage from "@/pages/welcome";
import apiClient from "@/lib/api-client";
import { GET_USERINFO_ROUTE } from "@/lib/constants";
import { useAppStore } from "@/store";
import Communitychat from '@/pages/chat/community/community-chat';
import Profilemain from "./pages/profile/profile-main";
import Wallpaper from '@/pages/wallpaper'

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USERINFO_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/welcomepage"
          element={
            <PrivateRoute>
              <Welcomepage/>
            </PrivateRoute>
          }
        />

<Route
          path="/communitychat"
          element={
            <PrivateRoute>
              <Communitychat/>
            </PrivateRoute>
          }
        />

        <Route
          path="/profilemain"
          element={
            <PrivateRoute>
              <Profilemain/>
            </PrivateRoute>
          }
        />

<Route
          path="/wallpaper"
          element={
            <PrivateRoute>
              <Wallpaper/>
            </PrivateRoute>
          }
        />

<Route path="*" element={<Navigate to='/Auth'/>}/>

      </Routes>
    </Router>
  );
}

export default App;
