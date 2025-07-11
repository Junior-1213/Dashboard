import { useAppSelector } from "../hooks/useAppSelector"
import { StatsCards } from "../components/dashboard/stats-cards"
import { AnalyticsChart } from "../components/dashboard/analytics-chart"
import { TeamCollaboration } from "../components/dashboard/team-collaboration"
import { ProjectProgress } from "../components/dashboard/project-progress"
import { TimeTracker } from "../components/dashboard/time-tracker"
import { Reminders } from "../components/dashboard/reminders"
import { Box, Typography, Grid, Button } from "@mui/material"
import { Add as AddIcon, FileUpload as ImportIcon } from "@mui/icons-material"

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: "#2c3e50" }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Plan, prioritize and accomplish your tasks with ease.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#2d5a3d",
              "&:hover": {
                backgroundColor: "#1e3d2a",
              },
            }}
          >
            Add Product
          </Button>
          <Button
            variant="outlined"
            startIcon={<ImportIcon />}
            sx={{
              borderColor: "#2d5a3d",
              color: "#2d5a3d",
              "&:hover": {
                borderColor: "#2d5a3d",
                backgroundColor: "rgba(45, 90, 61, 0.04)",
              },
            }}
          >
            Import Data
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ mb: 4 }}>
        <StatsCards />
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid sx={{ xs: 12, lg: 8 }}>
          <Grid container spacing={3}>
            <Grid sx={{ xs: 12}}>
              <AnalyticsChart />
            </Grid>
            <Grid sx={{ xs: 12, md: 6 }}>
              <TeamCollaboration />
            </Grid>
            <Grid sx={{ xs: 12, md: 6 }}>
              <ProjectProgress />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid sx={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3}>
            <Grid sx={{ xs: 12 }}>
              <Reminders />
            </Grid>
            <Grid sx={{ xs: 12 }}>
              <TimeTracker />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
