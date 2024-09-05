'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, Stack, Paper, Card, CardContent, CardActions, List, ListItem, ListItemText} from "@mui/material";
import Head from "next/head";
import EastIcon from '@mui/icons-material/East';
import { grey, teal, blue, cyan, green, orange, pink, indigo, lightBlue} from '@mui/material/colors';
import './globals.css';

const theme = createTheme({
    typography: {
        fontFamily: '"Inter Tight", sans-serif',
    },
    palette: {
        background: {
        default: '#ffffff',  // set the default background color for the whole app, white
        },
        primary: {
        main: '#000000',    // primary color, black
        },
        secondary: {
        main: "#304ffe",    // secondary color, blue-ish purple
        },
    }
});
export default function Home() {
    return (
    <ThemeProvider theme={theme}>
        <Box maxWidth="100vw" sx={{ backgroundColor: theme.palette.background.default}}>
            <Head>
                <link rel="icon" href="/public/images/logo.png" type="image/png"/>
                <title>FacultyForecast</title>
                <meta name = "description" content = 'Get AI support on choosing the best professor!'/>
            </Head>
            <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', py: 0.5, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                <Toolbar>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                    {/* Align Typography at flex-start */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
                        <Box component="img" src="/images/logo.png" alt="Logo" sx={{ height: 35, mr: 1.25, borderRadius: "3px" }} />
                        <Typography variant="h6" sx={{color: "#000000", fontSize: "22px"}}>
                            FacultyForecast
                        </Typography>
                    </Box>
                    {/* Center the second Stack */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                        <Stack direction="row" spacing={1}>
                        <Button href="#" sx={{ fontSize: '16px', textTransform: 'none'}}>Home</Button>
                        <Button href="#" sx={{ fontSize: '16px', textTransform: 'none'}}>Features</Button>
                        <Button href="#" sx={{ fontSize: '16px', textTransform: 'none' }}>About Us</Button>  
                        </Stack>
                    </Box>
                    {/* Align the third Stack at flex-end */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                        <Stack direction="row" spacing={1}>
                        <Button variant="outlined" href="#" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: "8px" }}>Log In</Button>
                        <Button variant="contained" color="secondary" href="#" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: "8px" }}>Sign Up</Button>  
                        </Stack>
                    </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* hero/landing page container */}
            <Box
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                height="100vh"
                >
                <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: 'center', px: 5 }}
                >
                    <Stack direction="column" spacing={3}>
                        <Button
                            variant="outlined"
                            endIcon={<EastIcon />}
                            href="/demo"
                            sx={{ fontSize: '14px', textTransform: 'none', borderRadius: "8px", maxWidth: "120px" }}
                        >
                            Try it out
                        </Button>
                        <Typography variant="h3" sx={{ color: "#000000", fontWeight: "bold"}}>
                            The AI agent cutting out time spent reading lengthy reviews
                        </Typography>
                        <Typography variant="h6" sx={{ color: grey[700]}}>
                            Chat with a personalized agent to find the best professor for your course—no more time spent reading reviews
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                            variant="outlined"
                            href="/demo"
                            sx={{ fontSize: '22px', textTransform: 'none', borderRadius: "8px", px: 3 }}
                            >
                            Try demo
                            </Button>
                            <Button
                            variant="contained"
                            color="secondary"
                            href="#"
                            sx={{ fontSize: '22px', textTransform: 'none', borderRadius: "8px", px: 3 }}
                            >
                            Start Chat
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    sx={{ flex: 1, display: "flex", alignItems: 'center', justifyContent: 'center', p: 2 }}
                >
                    <Box
                    component="img"
                    src="/images/logo.png"
                    alt="Logo"
                    sx={{ height: "auto", width: "80%", maxWidth: "400px", borderRadius: "3px" }}
                    />
                </Box>
            </Box>

        </Box>
    </ThemeProvider>
    )
}