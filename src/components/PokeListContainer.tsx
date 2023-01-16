import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { IPokemon } from "../config/pokemon";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../sagaActions";
import PokeDetailsModal from "./PokeDetailsModal";
import PokeCard from "./PokeCard";
import { PokeListItem } from "../app/store";

export function PokeListContainer() {
  const dispatch = useDispatch();

  const pokemon: Array<PokeListItem> = useSelector(
    (state: any) => state.pokemon.pokemon
  );

  const _next: string = useSelector((state: any) => state.pokemon.next);

  const selected: IPokemon = useSelector(
    (state: any) => state.pokemon.selected
  );

  const [isEndScroll, setIsEndScroll] = useState<boolean>(false);

  const handleScroll = (e: any) => {
    setIsEndScroll(false);
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setIsEndScroll(true);
    }
  };

  useEffect(() => {
    isEndScroll &&
      dispatch({
        type: sagaActions.LOAD_POKEMON_SAGA,
        payload: { params: _next.split("?")[1] },
      });
  }, [isEndScroll]);

  //initial load
  useEffect(() => {
    dispatch({
      type: sagaActions.LOAD_POKEMON_SAGA,
      payload: { params: "" },
    });
  }, []);

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
          {pokemon.map((poke: PokeListItem, idx: number) => (
            <PokeCard
              key={idx}
              name={poke.name}
              onClick={() =>
                dispatch({
                  type: sagaActions.SELECT_POKEMON,
                  payload: { url: poke.url },
                })
              }
            />
          ))}
        </Grid>
      </Box>

      <PokeDetailsModal
        pokemon={selected}
        open={!!selected}
        onClose={() =>
          dispatch({
            type: sagaActions.SELECT_POKEMON,
            payload: null,
          })
        }
      />
    </div>
  );
}
