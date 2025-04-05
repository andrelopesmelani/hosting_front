export const useAuth = () => {
    const token = localStorage.getItem("auth");
    return { token, isAuthenticated: !!token };
  };