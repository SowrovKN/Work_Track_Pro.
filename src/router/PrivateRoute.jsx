"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../components/firebase/AuthProvider";
import Loading from "../screens/loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) return <Loading></Loading>;
  if (user) return children;
  return <Loading />;
};

export default PrivateRoute;
