import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};
const Add = (props : Props) => {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const queryClient = useQueryClient()

  const mutation = useMutation(
    {
      mutationFn: () => {
        return fetch("http://localhost:8800/api/" + props.slug + "s", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: `${Math.floor(Math.random() * 100)}` ,
            img : 'ayman.JPG',
            firstName: 'ayman',
            lastName: 'ezz',
            email:'ayman@ezz',
            phone:'123 456 789',
            createdAt:'17.07.2024',
            verified:true
          }),
        })
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries({ queryKey: [`all${props.slug}s`] });
      }
    }
  )

  const handelSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
    props.setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <div className="modal">
              <span className="close" onClick={handleClose}>
                X
              </span>
              <h1>Add new {props.slug}</h1>
              <form onSubmit={handelSubmit}>
                {props.columns
                  .filter((item) => item.field !== "id" && item.field !== "img")
                  .map((column) => (
                    <div className="item">
                      <label>{column.headerName}</label>
                      <input type={column.type} placeholder={column.field} />
                    </div>
                  ))}
                <button type="submit">Add</button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Add;
