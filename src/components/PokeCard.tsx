import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

type Props = {
  name: string;
  onClick: () => void;
};

function PokeCard({ name, onClick }: Props) {
  return (
    <Grid item lg={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Poke Card
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default PokeCard;
