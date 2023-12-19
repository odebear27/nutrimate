import { createContext, useState } from "react";

export const AuthContext = createContext({
  credentials: {},
  handlerUserNameChange: () => {},
  handlerPasscodeChange: () => {},
  handlerRoleChange: () => {},
  isShowAuthError: false,
  setShowAuthError: () => {},
  authErrorMessage: "",
  setAuthErrorMessage: () => {},
  isLoggedIn: false,
  setLoginStatus: () => {},
  isLoggedOut: false,
  setLogoutStatus: () => {},
  resetCredentials: () => {},
  setDisplayName: () => {},
  displayName: "",
  resetDisplayName: () => {},
  accessToken: null,
  setAccessToken: () => {},
  tokenType: null,
  setTokenType: () => {},
  isInProgress: false,
  setInProgress: () => {},
  isComponentDisabled: false,
  setComponentDisabled: () => {},
});

const initCredentials = {
  username: "",
  passcode: "",
  role: "",
};

const initDisplayName = "Anonymous"

export function AuthContextProvider({ children }) {
  const [credentials, setCredentials] = useState(initCredentials);
  const [displayName, setDisplayName] = useState(initDisplayName);
  const [isShowAuthError, setShowAuthError] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [isLoggedOut, setLogoutStatus] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [isInProgress, setInProgress] = useState(false);
  const [isComponentDisabled, setComponentDisabled] = useState(false);

  const handlerUserNameChange = (value) => {
    setCredentials({
      ...credentials,
      username: value,
    });
  };

  const handlerPasscodeChange = (value) => {
    setCredentials({
      ...credentials,
      passcode: value,
    });
  };

  const handlerRoleChange = (value) => {
    const userRole = value[0] === 'ROLE_user' ? 
                                  'customers' : value[0] === 'ROLE_admin' ? 'admin' : 'unknown';
    setCredentials({
      ...credentials,
      role: userRole,
    });
  };

  const resetCredentials = () => {
    setCredentials(initCredentials);
  }

  const resetDisplayName = () => {
    setDisplayName(initDisplayName);
  }

  const authContext = {
    credentials: credentials,
    handlerUserNameChange: handlerUserNameChange,
    handlerPasscodeChange: handlerPasscodeChange,
    handlerRoleChange: handlerRoleChange,
    isShowAuthError: isShowAuthError,
    setShowAuthError: setShowAuthError,
    authErrorMessage: authErrorMessage,
    setAuthErrorMessage: setAuthErrorMessage,
    isLoggedIn: isLoggedIn,
    setLoginStatus: setLoginStatus,
    isLoggedOut: isLoggedOut,
    setLogoutStatus: setLogoutStatus,
    resetCredentials: resetCredentials,
    setDisplayName: setDisplayName,
    displayName: displayName,
    resetDisplayName: resetDisplayName,
    accessToken: accessToken,
    setAccessToken: setAccessToken,
    tokenType: tokenType,
    setTokenType: setTokenType,
    isInProgress: isInProgress,
    setInProgress: setInProgress,
    isComponentDisabled: isComponentDisabled,
    setComponentDisabled: setComponentDisabled,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}
