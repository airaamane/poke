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

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokeList>;
}

const API_URL = "https://pokeapi.co/api/v2";

export function PokeListContainer() {
  const [pokemons, setPokemons] = useState<Array<PokeList>>([]);
  const [selected, setSelected] = useState<string>("");
  const [next, setNext] = useState<string | null>(null);

  const [isEndScroll, setIsEndScroll] = useState<boolean>(false);

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("we are at bottom");
      setIsEndScroll(true);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/pokemon`)
      .then((res) => res.json())
      .then((res: PokemonListResponse) => {
        setPokemons(res.results);
        setNext(res.next);
      });
  }, []);

  useEffect(() => {
    isEndScroll &&
      !!next &&
      fetch(next)
        .then((res) => res.json())
        .then((res: PokemonListResponse) => {
          setPokemons((prev) => [...prev, ...res.results]);
          setNext(res.next);
          setIsEndScroll(false);
        });
  }, [isEndScroll]);

  return (
    <div
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        maxHeight: "80vh",
      }}
      onScroll={handleScroll}
    >
      <Typography variant="h4" component="h4" sx={{ my: "1.5rem" }}>
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
    </div>
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
