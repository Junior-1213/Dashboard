import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Link as MuiLink,
  Link,
} from "@mui/material"
import { Google as GoogleIcon } from "@mui/icons-material"

export function LoginForm() {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 1 }}>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your email and password to access the dashboard
          </Typography>

          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="password"
              required
              sx={{ mb: 3 }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, py: 1.5 }}>
              Sign In
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
            sx={{ mb: 2, py: 1.5 }}
          >
            "Sign in with Google"
          </Button>

          <Typography variant="body2" align="center" color="text.secondary">
            {"Don't have an account? "}
            <Link href="/register">
              <MuiLink component="span" sx={{ cursor: "pointer" }}>
                Sign up
              </MuiLink>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
