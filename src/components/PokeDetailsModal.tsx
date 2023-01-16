import { Modal, Box, Typography, Button } from "@mui/material";
import { IPokemon } from "../config/pokemon";

type PokeModalProps = {
  open: boolean;
  pokemon: IPokemon;
  onClose: () => void;
};

const PokeDetailsModal = ({ open, pokemon, onClose }: PokeModalProps) => {
  const handleClose = () => {
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
          <Button
            size="small"
            variant="outlined"
            onClick={onClose}
            sx={{ mt: "1rem" }}
          >
            OK
          </Button>
        </Box>
      ) : (
        <p>No pokemon found</p>
      )}
    </Modal>
  );
};

export default PokeDetailsModal;
