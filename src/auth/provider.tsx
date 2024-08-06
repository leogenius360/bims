"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from "firebase/app";
import { User, onAuthStateChanged } from "firebase/auth";
import { allowedUsers, internalUrls, requireAuth } from "@/config/site-config";
import {
  getFirebaseAuth,
  logOut,
  loginAnonymously,
  loginWithEmail,
  loginWithGoogle,
  signUpWithEmail,
} from "./firebase";
import { firebaseConfig } from "@/config/firebase-config";
import { Modal, ModalContent, Spinner } from "@nextui-org/react";

interface AuthContextType {
  loading: boolean;
  user: User | null;
  signUpWithEmail: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<User | unknown>;
  loginWithEmail: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<User | unknown>;
  loginWithGoogle: () => Promise<User | unknown>;
  loginAnonymously: () => Promise<User | unknown>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface firebaseProps {
  app?: FirebaseApp | undefined;
  config?: FirebaseOptions | undefined;
}

interface AuthProviderProps {
  authProvider: "firebase" | "other";
  firebase?: firebaseProps | undefined;
  children: ReactNode;
}

const authStateFuctions = {
  signUpWithEmail: signUpWithEmail,
  loginWithEmail: loginWithEmail,
  loginWithGoogle: loginWithGoogle,
  loginAnonymously: loginAnonymously,
  logOut: logOut,
};

export const AuthProvider = ({
  authProvider,
  firebase,
  children,
}: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthContextType>({
    loading: true,
    user: null,
    ...authStateFuctions,
  });

  useEffect(() => {
    if (authProvider === "firebase") {
      if (!firebase?.app && !firebase?.config) {
        throw new Error("Either firebase config or app must be provided");
      }
      if (!firebase?.app && firebase?.config) {
        // Initialize Firebase
        !getApps().length ? initializeApp(firebaseConfig) : getApp();
      }

      const auth = getFirebaseAuth();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setAuthState({ user, loading: false, ...authStateFuctions });
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
    if (authProvider === "other") {
      // Handle other authentication providers here if needed
      setAuthState({ user: null, loading: false, ...authStateFuctions });
    }
  }, [authProvider, firebase?.app, firebase?.config]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const withLoginRequired = (Component: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !user && requireAuth.includes(pathname)) {
        router.push(`${internalUrls.login}?redirect=${pathname}`);
      }
    }, [user, loading, pathname, router]);

    if (loading || (!user && requireAuth.includes(pathname))) {
      return (
        <Modal
          backdrop="opaque"
          isDismissable={false}
          placement="center"
          defaultOpen={true}
          hideCloseButton={true}
        >
          <ModalContent className="flex max-w-[12em] justify-center p-5 align-middle">
            <Spinner classNames={{ wrapper: "pt-2" }} />
            <h3 className="mt-3 text-center font-semibold">Loading ...</h3>
          </ModalContent>
        </Modal>
      );
    }

    if (
      !pathname.includes(internalUrls.auth) &&
      !allowedUsers.delivery.includes(user?.email!)
    ) {
      return router.push(internalUrls.accessDenied);
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
