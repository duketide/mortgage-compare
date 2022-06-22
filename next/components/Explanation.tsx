import { Box, Grid, Typography } from "@mui/material";

export default function Explanation() {
  return (
    <Grid
      container
      alignSelf="flex-start"
      flexDirection="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h3" component="h2">
          What is this application?
        </Typography>
        <Typography variant="body1">
          This app generates spreadsheets that are intended to help you compare
          the present value of mortgages (or other monthly payment obligations)
          over time. The app <em>does not</em> calculate a monthly payment
          amount based on an interest rate. You may enter an interest rate for
          each mortgage in the table above, but the interest rate is not
          actually used in any calculations. You must provide the monthly
          payment amount you wish to use in the comparison.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h2">
          Why does this application exist?
        </Typography>
        <Typography variant="body1">
          When my spouse and I were buying a house, we wanted to get a sense of
          which mortgage would be better for us depending on how long we stayed
          in the house. We understood that APRs are commonly used to compare
          mortages over the their full terms, but we wanted a more dynamic
          perspective. We created a spreadsheet much like the spreadsheets that
          this app generates. I was learning to code at the time and thought it
          might be helpful to automate the process of creating similar
          spreadsheets.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h2">
          What does the spreadsheet show?
        </Typography>
        <Typography variant="body1">
          The spreadsheet takes the highest monthly payment amount that you
          enter and treats that as a baseline, regardless of any upfront costs
          or credits. It then shows the present value of all of the mortgage
          options each month relative to that baseline. This means that the
          monthly payment for the option(s) with the highest monthly payment do
          not alter the present value of those options over time.
        </Typography>
        <br />
        <Typography>
          The month 0 amount for each option is equal to the difference between
          upfront costs (including discount point costs and other upfront costs)
          and upfront credits. These amounts are taken into account dollar for
          dollar. The amount shown for an option for subsequent months reflects
          the present value (i.e., the value as of the beginning of the mortgage
          term) of the difference between the highest monthly payment amount and
          the monthly payment amount for that option. These monthly differences
          are discounted at the discount rate shown in the spreadsheet.
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h3" component="h2">
          Am I an actuary or accountant?
        </Typography>
        <Typography variant="body1">
          I am not. Please assess the methodology and results of the spreadsheet
          for yourself. Do not assume that the spreadsheet is correct or
          represents the best comparison of your mortgage (or other monthly
          payment obligation) options.
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h3" component="h2">
          What information am I collecting?
        </Typography>
        <Typography variant="body1">
          None. This application stores your data in a database that is built
          into your browser called IndexedDB. In other words, the data you enter
          into the app is stored on your machine. I don't want it. This also
          means that you can use the application offline if you wish. The data
          is local to your machine and the specific browser you are using. For
          example, data you enter while accessing the app on Brave will not be
          available while accessing the app on Chrome. In addition, your data
          can be erased without specific action by you in some circumstances,
          e.g., if you are using the app in Private or Incognito mode.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h2">
          Will I consider suggestions for improving the app?
        </Typography>
        <Typography variant="body1">
          Absolutely. The code is available here. Please feel free to submit a
          pull request.
        </Typography>
      </Grid>
    </Grid>
  );
}
