import { createContext, useState } from "react"; 

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState("");

    const context = {
        isSignedIn,
        setIsSignedIn,
        email,
        setEmail
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;