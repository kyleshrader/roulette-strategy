import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Labouchere() {
  return (
    <Accordion sx={{ p: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="martingale-content"
        id="martingale-header"
      >
        <Typography color="primary" variant="h6">
          Labouchère System
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Typography variant="body1">
            The Labouchère system, also called the cancellation system or split
            martingale, is a gambling strategy used in roulette. The user of
            such a strategy decides before playing how much money they want to
            win, and writes down a list of positive numbers that sum to the
            predetermined amount. With each bet, the player stakes an amount
            equal to the sum of the first and last numbers on the list. If only
            one number remains, that number is the amount of the stake. If the
            bet is successful, the two amounts are removed from the list. If the
            bet is unsuccessful, the amount lost is appended to the end of the
            list. This process continues until either the list is completely
            crossed out, at which point the desired amount of money has been
            won, or until the player runs out of money to wager. The system is
            named for British politician and journalist Henry Labouchère, who
            originally devised the strategy.
          </Typography>
          <Typography variant="body1">
            The theory behind this Labouchère system is that, because the player
            is crossing two numbers off of the list (win) for every number added
            (loss) the player can complete the list, (crossing out all numbers)
            thereby winning the desired amount even though the player does not
            need to win as much as expected for this to occur. The Labouchère
            System is meant to be applied to even money Roulette propositions
            such as Even/Odd, Red/Black or 1–18/19–36. When any of these bets
            are made in the game of Roulette, a spin resulting in a "0" or "00"
            results in a loss, so even though the payout is even money, the
            oddla are clearly not 50/50. The Labouchère System attempts to
            offset these odds. If a player were to play any one of the above
            propositions, there are eighteen individual results which result in
            a win for that player and (for an American Roulette wheel) twenty
            individual results that result in a loss for that player. The player
            has an 18/38 chance of success betting any of the above
            propositions, which is around 47.37%. Theoretically, because the
            player is cancelling out two numbers on the list for every win and
            adding only one number for every loss, the player needs to have his
            proposition come at least 33.34% to eventually complete the list.
            For example, if the list starts with seven numbers and the player
            wins five times and loses three (62.5% winning percentage) the list
            is completed and the player wins the desired amount, if the list
            starts with seven numbers and the player wins 43,600 times and loses
            87,193 times (33.34% winning percentage) the list completes and the
            player wins.
          </Typography>
          <Typography variant="body1">
            <b>How to use this strategy in roulette?</b>
          </Typography>
          <ol>
            <li>
              Decide how much you would like to win. Let's say it will be 100$
            </li>
            <li>
              Split your target into series of numbers that add up to your
              target. For our case it will be "10, 20, 30, 40". I will call it a
              sequence.
            </li>
            <li>
              Bet on the chosen color with stake that is always equal to sum of
              first and last number in your sequence. First bet will be: 10 + 40
              = 50
            </li>
            <li>
              If you win, cross out the two numbers that made up your stake.
              Next bet will be now: 20 + 30 = 50
            </li>
            <li>
              If you lose, add your last stake at the end of the sequence. If we
              lose, our sequence will look like that: "10, 20, 30, 40, 50". Next
              stake will again be sum of the first and last number in sequence
              (10 + 50 = 60)
            </li>
            <li>
              Repeat 3rd and 4th step until you've crossed out every number in
              sequence (it will mean that you have accomplished your target)
              ...or until you've run out of money!
            </li>
          </ol>
          <Typography variant="body1" color="primary">
            Read more:
          </Typography>
          <a href="https://en.wikipedia.org/wiki/Labouch%C3%A8re_system">
            wikipedia.org
          </a>
          <a href="https://www.roulettesites.org/strategies/labouchere/">
            roulettesites.org
          </a>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
