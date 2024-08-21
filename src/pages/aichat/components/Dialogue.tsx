/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAssistantData } from "pages/views/assistants/hooks";
import _ from "lodash";
import { ApiService } from "services/api";

export default function FormDialog({ setCreateChat, onCreateChat }: any) {
  const [open, setOpen] = React.useState(true); // Start with the dialog open
  const { assistants } = useAssistantData();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setCreateChat(false); // Ensures the dialog is properly closed
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ApiService.post(
      `/api/app/chat`,
      { title: name, assisstantId: age },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        setCreateChat(false);
        onCreateChat(res.data); // Assuming res.data contains the newly created chat details
      })
      .catch((error) => {
        console.error("Failed to create chat:", error);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#1e2029' } }}>
        <DialogTitle style={{ color: '#FFFFFF' }}>Please select an assistant</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText style={{ color: '#ADACBF' }}>
              Choose an assistant from the assistant list below and click on the assistant to
              select button to select
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="Chat Title"
              value={name}
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              fullWidth
              variant="standard"
              InputProps={{ style: { color: '#FFFFFF' } }}
              InputLabelProps={{ style: { color: '#ADACBF' } }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "50%" }}>
              <InputLabel id="demo-simple-select-standard-label" style={{ color: '#ADACBF' }}>Assistant</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Assistant"
                style={{ color: '#FFFFFF' }}
              >
                {assistants?.items?.map((item: any) => (
                  <MenuItem key={_.uniqueId()} value={item.id} style={{ color: '#ADACBF' }}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: '#FFFFFF' }}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: '#18677a', color: 'white' }}>Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
