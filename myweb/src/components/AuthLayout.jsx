import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { AuthProvider } from "../hooks/useAuth";
import ParticleBackground from "./ParticleBackground";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();

  return (
    <>
      <ParticleBackground/>
      <Suspense fallback={
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress className="justify-center" style={{height: '4rem', width: '4rem'}}/>
          <p className="font-semibold text-[2rem]" style={{marginTop: '30px'}}>Loading...</p>
        </div>
      }>
        <Await
          resolve={userPromise}
          errorElement={<Alert severity="error">Something went wrong!</Alert>}
          children={(user) => (
            <AuthProvider userData={user}>{outlet}</AuthProvider>
          )}
        />
      </Suspense>
    </>
  );
};