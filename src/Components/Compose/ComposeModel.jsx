import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../Pages/SignupPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  justifyContent: "space-between",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  overflowWrap: "break-word",
  borderRadius: "10px",
  border: "2px solid var(--sig-color)",
  boxShadow: 24,
  p: 4,
};
const Box2Style = {
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  overflowY: "scroll",
  overflowWrap: "break-word",
  p: 4,
};
export default function ComposeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emailData, setEmailData] = React.useState({
    to: "",
    subject: "",
    email_body: "",
  });
  const handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setEmailData({ ...emailData, [field]: value });
    console.log(emailData);
  };
  const sendHandler = async (e) => {
    e.preventDefault();
    const { to, subject, email_body } = emailData;
    const userId = localStorage.getItem("userId");
    await axios
      .post("/compose", {
        to,
        userId,
        subject,
        email_body,
      })
      .then((req) => {
        console.log(req);
        toast.success(req.data.note, toastOptions);
        setEmailData({
          to: "",
          subject: "",
          email_body: "",
        });
        handleClose();
      })
      .catch((err) => {
        toast.error(err.response.data.note, toastOptions);
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={handleOpen} className="btn btn-primary btn-block">
        Compose
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            style={{ color: "#007bff" }}
            variant="h6"
            component="h3"
          >
            Compose Mail
          </Typography>
          <Box sx={Box2Style}>
            <div id="email-container">
              <div id="email-container-to-field">
                <label htmlFor="to" className="Input-label">
                  To:
                </label>
                <input
                  type="email"
                  name="to"
                  className="to-and-from-feild-input"
                  onChange={handleChange}
                  value={emailData.to}
                  required
                />
              </div>
              <div id="email-container-subject-field">
                <label htmlFor="subject" className="Input-label">
                  Subject:
                </label>
                <input
                  type="text"
                  name="subject"
                  className="email-container-subject-field-input"
                  onChange={handleChange}
                  value={emailData.subject}
                  required
                />
              </div>
              <div id="email-container-body-field">
                <textarea
                  name="email_body"
                  id="email-body"
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                  value={emailData.email_body}
                  required
                ></textarea>
              </div>
              <div id="email-container-send-field">
                <button
                  className="btn btn-primary btn-block"
                  style={{ width: "5rem" }}
                  onClick={sendHandler}
                >
                  send
                </button>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
