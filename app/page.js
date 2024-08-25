"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hello! I am the Rate My Professor support assistant. How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    // clear message input textfield
    setMessage("");

    // update the state to include the user's new message and a placeholder for the assistant model's response
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message }, // add the user's new message
      { role: "model", content: "" }, // add an empty placeholder for the assistant model's response
    ]);

    try {
      // Send a POST request to the server @ the '/api/chat' endpoint with the current messages and the new user query
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // specify the request body format as JSON
        },
        // create request body by converting the messages array (including the latest user message) to JSON
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      // get a reader for the response body to handle streaming data
      const reader = response.body.getReader();
      // create a decoder to convert bytes to text
      const decoder = new TextDecoder();

      let result = "";
      // process the incoming stream of data from the server
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        // decode the chunk of data received from the server
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        // update the state to append the decoded text to the assistant model's response
        setMessages((messages) => {
          // get the last message (the placeholder for the assistant model's response)
          let lastMessage = messages[messages.length - 1];
          // get all messages except the last one
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages, // include all older messages
            { ...lastMessage, content: lastMessage.content + text }, // update the last message with the new content
          ];
        });
        // continue reading the next chunk of data from the stream
        return reader.read().then(processText);
      });
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "model",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={"column"}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "model" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "model" ? "primary.main" : "secondary.main"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
