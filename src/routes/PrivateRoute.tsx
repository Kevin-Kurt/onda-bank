import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/session";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = !!getSession();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
