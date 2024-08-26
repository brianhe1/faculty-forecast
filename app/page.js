"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { yellow, grey } from '@mui/material/colors';
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from 'react-markdown';
import { useState, useRef, useEffect } from "react";
import "./globals.css"

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hi there! 👋 I'm your personal support assistant, ready to help you find the perfect professor that meets your needs. How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const chatContainerRef = useRef(null); // reference to chat container

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // scroll to bottom when messages change

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
      padding={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* message chat container */}
      <Stack
        direction={"column"}
        width="90vw"
        maxWidth={600}
        height="70vh"
        border="1px solid gray"
        borderRadius={5}
        spacing={2}
        p={2}
        display="flex"
      >
        {/* each message bubble */}
        <Stack
          direction={"column"}
          spacing={1.25}
          flexGrow={1}
          overflow="auto"
          maxHeight="100vh"
          ref={chatContainerRef} // assign the ref here
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
                  message.role === "model" ? grey[900] : "#304ffe"
                }
                color="white"
                borderRadius={5}
                maxWidth="80%"
                overflow="auto"
                minHeight="35px"
                pt={1.25}
                pb={1.25}
                pl={2}
                pr={2}
              >
                <ReactMarkdown className="markdown-content">{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2} height="40px">
          <TextField
            label="Message"
            size="small"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            InputProps={{
              sx: {
                borderRadius: "50px",
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#304ffe", // color when hovered
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#304ffe", // color when focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                '&.Mui-focused': {
                  color: "#304ffe", // label color when focused
                },
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            sx={{
              borderRadius: "50px", 
              padding: "0px 25px", 
              bgcolor: "#304ffe", 
              '&:hover': {
                bgcolor: "#304ffe", // color change on hover
              }
            }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
