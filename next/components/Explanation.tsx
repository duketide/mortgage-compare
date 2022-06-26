import { Box, Grid, Link, Typography } from "@mui/material";

export default function Explanation() {
  const explanationVariant = "h4";
  return (
    <Grid container flexDirection="column" spacing={2} mb={8}>
      <Grid item>
        <Typography variant={explanationVariant} component="h2">
          What is this application?
        </Typography>
        <Typography variant="body1">
          This app generates spreadsheets that are intended to help you compare
          the present value of mortgages (or other monthly payment obligations)
          over time. You enter basic information into the table above and
          generate a spreadsheet (.xlsx format) by clicking the
          &quot;Spreadsheet&quot; or &quot;Python&quot; button. You might not be
          able to download a spreadsheet on some mobile browsers. The app{" "}
          <em>does not</em> calculate a monthly payment amount based on an
          interest rate. You may enter an interest rate for each mortgage in the
          table above, but the interest rate is not actually used in any
          calculations. The amounts used in the calculations are the monthly
          payment amount, upfront costs (including discount point cost, which is
          separately listed), and upfront credits.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={explanationVariant} component="h2">
          Why are there two buttons?
        </Typography>
        <Typography variant="body1">
          The &quot;Spreadsheet&quot; button creates a spreadsheet using a
          JavaScript library that runs in your browser. It does not send the
          data to any backend server. The &quot;Python&quot; button creates a
          spreadsheet using a Python library that runs on a remote server, so
          your data is sent to that server to create the spreadsheet. The
          spreadsheet generated with Python has one feature that the other
          spreadsheet lacks: a green background for the cell(s) with the
          greatest present value for each month. These cells should update
          automatically if you tweak the numbers in the spreadsheet. The
          &quot;Python&quot; button will not work offline.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={explanationVariant} component="h2">
          Why does this application exist?
        </Typography>
        <Typography variant="body1">
          My spouse and I were buying a house and wanted to get a sense of which
          mortgage option would be best for us depending on how long we stayed
          in the house. We understood that APRs are commonly used to compare
          mortages over the their full terms, but we wanted a more dynamic
          perspective. We created a spreadsheet like the spreadsheets that this
          app generates. I was learning to code at the time and thought it might
          be helpful to automate creation of similar spreadsheets.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={explanationVariant} component="h2">
          What does the spreadsheet show?
        </Typography>
        <Typography variant="body1">
          The spreadsheet takes the highest monthly payment amount that you
          enter and treats that as a baseline, regardless of any upfront costs
          or credits. It then shows the present value of each of the mortgage
          options for each month relative to that baseline. This means that the
          monthly payments for the option(s) with the highest monthly payment
          amount do not alter the present value of those options over time.
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
          are discounted at the discount rate shown in the spreadsheet. You can
          change the discount rate in the spreadsheet and all dependent values
          should update automatically.
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant={explanationVariant} component="h2">
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
        <Typography variant={explanationVariant} component="h2">
          What information am I collecting?
        </Typography>
        <Typography variant="body1">
          None. This application stores your mortgage data in a database that is
          built into your browser called IndexedDB. Your preference for light or
          dark mode is saved in a different part of your browser&apos;s storage
          called localStorage. In other words, your data is stored on your
          machine. The data is local to your machine and the specific browser
          you are using. For example, data you enter while accessing the app on
          Brave will not be available while accessing the app on Chrome. In
          addition, your data can be erased without specific action by you in
          some circumstances, e.g., if you are using the app in Private or
          Incognito mode. Because your data is stored locally, you should be
          able to use the application offline.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={explanationVariant} component="h2">
          Will I consider suggestions for improving the app?
        </Typography>
        <Typography variant="body1">
          Absolutely. The code is available{" "}
          <Link
            href="https://github.com/duketide/mortgage-compare"
            target="_blank"
            rel="noreferrer"
          >
            here
          </Link>
          . Please feel free to submit a pull request.
        </Typography>
      </Grid>
    </Grid>
  );
}
