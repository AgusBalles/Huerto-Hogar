import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Verificar si hay un usuario guardado al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem("huerto-user");
    const savedRegisteredUsers = localStorage.getItem("huerto-registeredUsers");
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        console.log('✅ Usuario cargado desde localStorage:', userData);
      } catch (error) {
        console.error('❌ Error cargando usuario:', error);
        localStorage.removeItem("huerto-user");
      }
    }
    
    if (savedRegisteredUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedRegisteredUsers));
      } catch (error) {
        console.error('❌ Error cargando usuarios registrados:', error);
        localStorage.removeItem("huerto-registeredUsers");
      }
    } else {
      // Usuario demo por defecto
      const demoUser = {
        id: 1,
        name: "Usuario Demo",
        email: "demo@test.com",
        password: "123456"
      };
      setRegisteredUsers([demoUser]);
      localStorage.setItem("huerto-registeredUsers", JSON.stringify([demoUser]));
    }
    
    setLoading(false);
  }, []);

  // Función de login
  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('🔐 Buscando usuario:', email);
        console.log('📋 Usuarios registrados:', registeredUsers);
        
        // Buscar usuario en la lista de registrados
        const foundUser = registeredUsers.find(user => user.email === email);

        if (!foundUser) {
          console.log('❌ Usuario no encontrado:', email);
          resolve({ 
            success: false, 
            error: "USER_NOT_FOUND",
            message: "Usuario no encontrado" 
          });
          return;
        }

        // Verificar contraseña
        if (foundUser.password !== password) {
          console.log('❌ Contraseña incorrecta para:', email);
          resolve({ 
            success: false, 
            error: "INVALID_PASSWORD",
            message: "Contraseña incorrecta" 
          });
          return;
        }

        // Login exitoso
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        };

        setUser(userData);
        setIsAuthenticated(true);
        
        // Guardar en localStorage
        localStorage.setItem("huerto-user", JSON.stringify(userData));
        console.log('✅ Usuario guardado en localStorage:', userData);
        
        resolve({ 
          success: true, 
          message: "Login exitoso",
          user: userData 
        });
      }, 1000);
    });
  };

  // Función de registro
  const register = (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificar si el usuario ya existe
        const userExists = registeredUsers.find(user => user.email === email);
        
        if (userExists) {
          resolve({ 
            success: false, 
            error: "USER_ALREADY_EXISTS",
            message: "El usuario ya está registrado" 
          });
          return;
        }

        // Crear nuevo usuario
        const newUser = {
          id: Date.now(),
          name: name,
          email: email,
          password: password
        };

        // Agregar a la lista de usuarios registrados
        const updatedUsers = [...registeredUsers, newUser];
        setRegisteredUsers(updatedUsers);
        localStorage.setItem("huerto-registeredUsers", JSON.stringify(updatedUsers));

        // Auto-login después del registro
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("huerto-user", JSON.stringify(userData));

        resolve({ 
          success: true, 
          message: "Registro exitoso",
          user: userData 
        });
      }, 1000);
    });
  };

  // Función de logout MEJORADA
  const logout = () => {
    console.log('🚪 Cerrando sesión de:', user?.email);
    setUser(null);
    setIsAuthenticated(false);
    // Limpiar solo el usuario, mantener los usuarios registrados
    localStorage.removeItem("huerto-user");
    console.log('✅ Sesión cerrada, usuario removido de localStorage');
  };

  // Actualizar información del usuario
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("huerto-user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    currentUser: user, // Alias para compatibilidad
    registeredUsers // Para debugging
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}