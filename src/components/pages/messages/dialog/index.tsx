import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { DialogHeader } from "./dialogHeader";
import { Message } from "./message";

export const Dialog: FC = () => {
  const messagesArray = [1, 2, 3];
  return (
    <>
      {messagesArray.length ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            backgroundColor: "#F1F7FA",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <DialogHeader />

          <Box
            sx={{
              width: "98%",
              marginX: "auto",
              height: "71vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "62vh",
                border: "1px solid black",
                borderRadius: "1rem",
                overflow: "auto",
              }}
            >
              {/* Messages */}
              <Message isMyMessage={false}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maiores quisquam fuga iure ipsum inventore iste reiciendis
                adipisci, nostrum rem veritatis esse ipsam recusandae doloribus
                quas. Molestiae, quas molestias expedita consequuntur omnis
                libero officiis nesciunt quam minus, fugit aperiam quod
                architecto laboriosam obcaecati, facere inventore cupiditate
                enim. Beatae corporis dolorum dignissimos officia officiis,
                impedit tempora. Odio, aspernatur corrupti sunt tempore sequi
                recusandae omnis quibusdam distinctio animi ipsam id debitis
                voluptates perspiciatis quisquam quos incidunt minima nemo. Nam
                amet dolorum minus quo repudiandae totam modi inventore neque
                asperiores corrupti fugit reprehenderit, exercitationem tempora,
                officiis illum repellat? A necessitatibus vero expedita saepe!
              </Message>
              <Message isMyMessage={false}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              </Message>
              <Message isMyMessage={true}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maiores quisquam fuga iure ipsum inventore iste reiciendis
                adipisci, nostrum rem veritatis esse ipsam recusandae doloribus
                quas. Molestiae, quas molestias expedita consequuntur omnis
                libero officiis nesciunt quam minus, fugit aperiam quod
                architecto laboriosam obcaecati, facere inventore cupiditate
                enim. Beatae corporis dolorum dignissimos officia officiis,
                impedit tempora. Odio, aspernatur corrupti sunt tempore sequi
                recusandae omnis quibusdam distinctio animi ipsam id debitis
                voluptates perspiciatis quisquam quos incidunt minima nemo. Nam
                amet dolorum minus quo repudiandae totam modi inventore neque
                asperiores corrupti fugit reprehenderit, exercitationem tempora,
                officiis illum repellat? A necessitatibus vero expedita saepe!
              </Message>
              <Message isMyMessage={false}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                maiores quisquam fuga iure ipsum inventore iste reiciendis
                adipisci, nostrum rem veritatis esse ipsam recusandae doloribus
                quas. Molestiae, quas molestias expedita consequuntur omnis
                libero officiis nesciunt quam minus, fugit aperiam quod
                architecto laboriosam obcaecati, facere inventore cupiditate
                enim. Beatae corporis dolorum dignissimos officia officiis,
                impedit tempora. Odio, aspernatur corrupti sunt tempore sequi
                recusandae omnis quibusdam distinctio animi ipsam id debitis
                voluptates perspiciatis quisquam quos incidunt minima nemo. Nam
                amet dolorum minus quo repudiandae totam modi inventore neque
                asperiores corrupti fugit reprehenderit, exercitationem tempora,
                officiis illum repellat? A necessitatibus vero expedita saepe!
              </Message>
              {/* Messages */}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <textarea
                name=""
                id=""
                style={{ resize: "none", width: "70%", height: "100%" }}
              ></textarea>
              <Button variant="contained" sx={{ width: "25%", height: "100%" }}>
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </>
  );
};
