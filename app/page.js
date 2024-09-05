'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, Stack, Divider} from "@mui/material";
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
                <link rel="icon" href="/images/logo.png" type="image/png"/>
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
                        <Button href="#" color="secondary" sx={{ fontSize: '16px', textTransform: 'none'}}>Home</Button>
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
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}
                height="100vh"
                >
                <Box
                    sx={{ flex: 0.75, display: "flex", flexDirection: "column", justifyContent: 'center', pl: 5 }}
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
                    sx={{ flex: 1.25, display: "flex", justifyContent: "flex-end", alignItems: "flex-end",  objectFit: 'contain' }}
                >
                    <Box
                    component="img"
                    src="/images/landingpage.png"
                    alt="Logo"
                    sx={{ height: "100vh", width: "auto", alignSelf: 'flex-end' }}
                    />
                </Box>
            </Box>

            {/* problem section */}
            <Box
                display="flex" flexDirection="row" justifyContent="center" alignItems="center"
                sx={{ backgroundColor: grey[900], px: 5}}
                height="100vh"
                >
                <Box
                sx={{ position: "absolute", top: "110vh", left: 0, flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end",  objectFit: 'contain' }}
                >
                    <Box
                    component="img"
                    src="/images/problem1.png"
                    alt="Logo"
                    sx={{ height: "90vh", width: "auto", objectFit: 'cover'  }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" sx={{maxWidth: "875px", zIndex: 2 }}>

                    <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold"}} gutterBottom>
                        76% of Students Struggle to Find the{' '}
                        <span style={{ color: "#c3deff" }}>Right Professor*</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#ffffff"}} gutterBottom>According to recent surveys, most students report difficulty selecting professors due to overwhelming or unclear reviews.</Typography>
                    <Typography sx={{ fontSize: "12px", color: grey[400]}}>*Disclaimer: fake statistic 😂</Typography>
                </Box>
                <Box
                sx={{ position: "absolute", top: "110vh", right: 0, flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end",  objectFit: 'contain' }}
                >
                    <Box
                    component="img"
                    src="/images/problem2.png"
                    alt="Logo"
                    sx={{ height: "90vh", width: "auto", objectFit: 'cover'  }}
                    />
                </Box>
            </Box>

            {/* solution section */}
            <Box sx={{ backgroundColor: grey[900], display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* Centered Divider */}
                <Divider
                    sx={{
                    borderColor: grey[700],
                    borderBottomWidth: 1,
                    width: "95vw"
                    }}
                />
            </Box>
            <Box
                display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                sx={{ backgroundColor: grey[900], py: 10, px: 6}}
                >
                    <Stack direction="column" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" sx={{ color: "#c3deff", fontWeight: "bold"}} gutterBottom>THE SOLUTION</Typography>
                        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold", mb: 6}}>
                            Offering personalized support that every student deserves.
                        </Typography>
                    </Stack>
                    <Box width="95%">
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <Stack direction="column" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        sx={{ fontSize: '20px', borderRadius: "8px", bgcolor: grey[800], color: "#ffffff", maxWidth: "300px"}}
                                        >
                                        Choose Your University
                                    </Button>
                                    <Box sx={{bgcolor: grey[800], borderRadius: "8px", p: 4, minHeight: "700px"}}>
                                        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold"}} gutterBottom>Over 100+ Universities</Typography>
                                        <Typography variant="h5" sx={{ color: grey[400], mb: 6}}>
                                            Data collected from Rate My Professors. If your university is listed, we can assist you.
                                        </Typography>
                                        <Box
                                            component="img"
                                            src="/images/solution1.png"
                                            alt="Logo"
                                            sx={{ height: "auto", width: "100%"}}
                                        />
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item md={4}>
                                <Stack direction="column" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        sx={{ fontSize: '20px', borderRadius: "8px", bgcolor: grey[800], color: "#ffffff", maxWidth: "240px"}}
                                        >
                                        Submit your Query
                                    </Button>
                                    <Box sx={{bgcolor: grey[800], borderRadius: "8px", p: 4, minHeight: "700px"}}>
                                        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold"}} gutterBottom>Personalized Support</Typography>
                                        <Typography variant="h5" sx={{ color: grey[400], mb: 6}}>
                                            Our AI can assist you with professor ratings, lecture styles, pop quizzes, and more.
                                        </Typography>
                                        <Box
                                            component="img"
                                            src="/images/solution2.png"
                                            alt="Logo"
                                            sx={{ height: "auto", width: "100%"}}
                                        />
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item md={4}>
                                <Stack direction="column" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        sx={{ fontSize: '20px', borderRadius: "8px", bgcolor: grey[800], color: "#ffffff", maxWidth: "190px"}}
                                        >
                                        Get Response
                                    </Button>
                                    <Box sx={{bgcolor: grey[800], borderRadius: "8px", p: 4, minHeight: "700px"}}>
                                        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold"}} gutterBottom>Fast Response Times</Typography>
                                        <Typography variant="h5" sx={{ color: grey[400], mb: 6}}>
                                            Our support AI uses a database to provide the most up-to-date and relevant responses.
                                        </Typography>
                                        <Box
                                            component="img"
                                            src="/images/solution3.png"
                                            alt="Logo"
                                            sx={{ height: "auto", width: "100%"}}
                                        />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
            </Box>

            {/* cta section */}
            <Box
                display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                sx={{ p: 5,  margin: "0 auto" }}
                minHeight="25vh"
                maxWidth="1000px"
                
                >
                <Typography textAlign="center" variant="h3" sx={{ color: "#000000", fontWeight: "bold", mb: 3}}>
                    Start off your new semester right. <br/> Start with FacultyForecast.
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                    variant="outlined"
                    href="/demo"
                    sx={{ fontSize: '20px', textTransform: 'none', borderRadius: "8px", px: 3 }}
                    >
                    Try demo
                    </Button>
                    <Button
                    variant="contained"
                    color="secondary"
                    href="#"
                    sx={{ fontSize: '20px', textTransform: 'none', borderRadius: "8px", px: 3 }}
                    >
                    Start Chat
                    </Button>
                </Stack>
            </Box>
        </Box>
    </ThemeProvider>
    )
}