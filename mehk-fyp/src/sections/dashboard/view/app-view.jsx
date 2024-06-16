import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppConversionRates from "../app-conversion-rates";
import React, { useState, useEffect } from "react";
// ----------------------------------------------------------------------
import { getToken } from "../../../utils/token-util";

export default function AppView() {
  const [stats, setStats] = useState(null);

  const getStats = () => {
    const token = getToken();

    fetch(`http://localhost:5000/api/v1/admin/statsApi`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setStats(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  let user = 0;
  useEffect(() => {
    getStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }
  stats.gender.map((g) => (user = user + g.count));
  const genderData = stats.gender.map((g) => ({
    label: g.gender,
    value: g.count,
  }));
  const registrationData = {
    labels: stats.createdAt.map((item) => item.date),
    series: [
      {
        name: "Registrations",
        type: "line",
        fill: "solid",
        data: stats.createdAt.map((item) => item.count),
      },
    ],
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Mehak Hussain 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={user}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Successful Registration"
            total={133}
            color="info"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Unsuccessful Registrations"
            total={15}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Verification Requests"
            total={234}
            color="error"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Monthly Registrations"
            subheader="(+43%) than last year"
            chart={registrationData}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Gender"
            chart={{
              series: genderData,
            }}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppConversionRates
            title="Geographical Conversions"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: "Italy", value: 400 },
                { label: "Japan", value: 430 },
                { label: "China", value: 448 },
                { label: "Canada", value: 470 },
                { label: "France", value: 540 },
                { label: "Germany", value: 580 },
                { label: "South Korea", value: 690 },
                { label: "Netherlands", value: 1100 },
                { label: "United States", value: 1200 },
                { label: "United Kingdom", value: 1380 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
