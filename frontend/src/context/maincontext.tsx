import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '@context/useauth';
import { Project } from '@datatypes/project';
import { User } from '@datatypes/user';
import { getSafe } from '@api/safe';

// Step 3: Create a context with the initial state
export interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  projects: Project[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  setUser: (usr: User) => void;
  fetchProjects: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Step 4: Create a custom hook to access the context
const useMainContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useMainContext must be used within an MainContextProvider'
    );
  }
  return context;
};

// Step 5: Create a context provider component
interface MainContextProviderProps {
  children: ReactNode;
}

const MainContextProvider: React.FC<MainContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(useAuth());
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await getSafe('/api/projects');
      setProjects([...(response as Project[])]);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('alluvium_auth_token');
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        projects,
        loading,
        isLoggedIn: !!user,
        setLoading,
        setUser,
        fetchProjects,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { MainContextProvider, useMainContext };
