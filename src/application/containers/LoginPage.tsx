import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { loginSuccess, setLoading, setError } from "../store/slices/authSlice";
import { auth, googleProvider } from "../../persistence/api/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Link,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  // Limpiar error automáticamente después de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      // Redirigir a la ruta previa si existe, si no al dashboard
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        loginSuccess({
          id: user.uid,
          email: user.email!,
          name: user.displayName || "",
          status: "",
          ownerId: "",
        })
      );
      // No navegamos aquí, el useEffect se encarga
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(
        loginSuccess({
          id: user.uid,
          email: user.email!,
          name: user.displayName || "",
          status: "",
          ownerId: "",
        })
      );
    } catch (error: any) {
      if (
        error &&
        (error.code === "auth/popup-closed-by-user" ||
          error.code === "auth/cancelled-popup-request")
      ) {
        dispatch(setError("Inicio de sesión cancelado."));
      } else {
        dispatch(
          setError(error?.message || "Error al iniciar sesión con Google.")
        );
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 1 }}
          >
            Sign In
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Enter your email and password to access the dashboard
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{ mb: 2, py: 1.5 }}
          >
            "Sign in with Google"
          </Button>

          <Typography variant="body2" align="center" color="text.secondary">
            {"Don't have an account? "}
            <Link href="/register">
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
