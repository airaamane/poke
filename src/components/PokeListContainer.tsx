import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { IPokemon } from "../config/pokemon";

type PokeList = {
  name: string;
  url: string;
};

type PokeModalProps = {
  open: boolean;
  pokeUrl: string;
  onClose: () => void;
};

export function PokeListContainer() {
  const [pokemons, setPokemons] = useState<Array<PokeList>>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((res) => setPokemons(res.results));
  }, []);

  return (
    <>
      <Typography variant="h4" component="h4">
        Pokemon List
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {pokemons.map(({ name, url }, idx) => (
            <Grid item lg={3} key={idx}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Poke Card
                  </Typography>
                  <Typography variant="h5" component="div">
                    {name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setSelected(url)}>
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <PokeModal
        pokeUrl={selected}
        open={!!selected}
        onClose={() => setSelected("")}
      />
    </>
  );
}

const PokeModal = ({ open, pokeUrl, onClose }: PokeModalProps) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>({} as IPokemon);

  useEffect(() => {
    pokeUrl &&
      fetch(pokeUrl)
        .then((res) => res.json())
        .then(setPokemon);
  }, [pokeUrl]);

  const handleClose = () => {
    setPokemon(null);
    onClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-pokemon-details"
    >
      {pokemon ? (
        <Box sx={style}>
          <img src={pokemon.sprites?.["front_default"]} alt="" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pokemon.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Base experience: {pokemon.base_experience}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            height: {pokemon.height}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Weight: {pokemon.weight}
          </Typography>
        </Box>
      ) : (
        <p>No pokemon found</p>
      )}
    </Modal>
  );
};
