import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Martingale() {
  return (
    <Accordion sx={{ p: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="martingale-content"
        id="martingale-header"
      >
        <Typography color="primary" variant="h6">
          Martingale Strategy
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Typography variant="body1">
            A martingale is a class of betting strategies that originated from
            and were popular in 18th-century France. The simplest of these
            strategies was designed for a game in which the gambler wins the
            stake if a coin comes up heads and loses if it comes up tails. The
            strategy had the gambler double the bet after every loss, so that
            the first win would recover all previous losses plus win a profit
            equal to the original stake. Thus the strategy is an instantiation
            of the St. Petersburg paradox.
          </Typography>
          <Typography variant="body1">
            Since a gambler will almost surely eventually flip heads, the
            martingale betting strategy is certain to make money for the gambler
            provided they have infinite wealth and there is no limit on money
            earned in a single bet. However, no gambler has infinite wealth, and
            the exponential growth of the bets can bankrupt unlucky gamblers who
            chose to use the martingale, causing a catastrophic loss. Despite
            the fact that the gambler usually wins a small net reward, thus
            appearing to have a sound strategy, the gambler's expected value
            remains zero because the small probability that the gambler will
            suffer a catastrophic loss exactly balances with the expected gain.
            In a casino, the expected value is negative, due to the house's
            edge. Additionally, as the likelihood of a string of consecutive
            losses is higher than common intuition suggests, martingale
            strategies can bankrupt a gambler quickly.
          </Typography>
          <Typography variant="body1">
            <b>How to use this strategy in roulette?</b>
          </Typography>
          <ol>
            <li>Choose the color you want to bet on.</li>
            <li>
              You won? Good, keep betting on the same color with base stake.
            </li>
            <li>
              You lost? Well, double your previous stake and bet on chosen
              color.
            </li>
          </ol>
          <Typography variant="body1" color="primary">
            Read more: <br />
          </Typography>
          <a href=" https://en.wikipedia.org/wiki/Martingale_(betting_system)">
            wikipedia.org
          </a>
          <a href=" https://www.roulettesites.org/strategies/martingale/">
            roulettesites.org
          </a>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
