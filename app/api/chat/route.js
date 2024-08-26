import {NextResponse} from 'next/server'
import {Pinecone} from '@pinecone-database/pinecone'
const { GoogleGenerativeAI } = require("@google/generative-ai");

// access API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// for embeddings, use the Text Embeddings model
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004"});
// for text generation, use the Text Generation model
const textGenerationModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
You are an AI assistant specialized in helping students find the best professors for their courses. You utilize a Retrieval-Augmented Generation (RAG) system, which allows you to access and analyze a vast database of professor reviews, ratings, and course information in real-time. Your responses are based on this up-to-date, retrieved information combined with your general knowledge.
For every user question, the top 3 professors that match the user question are returned. Use them to answer the question if needed.
Key responsibilities:
1. Interpret student queries about professors and courses.
2. Retrieve relevant information from the database using RAG technology.
3. Provide detailed, data-driven information about professors, including their teaching style, course difficulty, and overall rating based on the retrieved data.
4. Offer recommendations by synthesizing the retrieved information with your general knowledge.
5. Compare multiple professors teaching the same course when applicable, using specific data points from the RAG system.
6. Explain the reasoning behind your recommendations, citing specific reviews or statistics when relevant.
7. Suggest alternative professors or courses if the student's first choice is unavailable or unsuitable, based on similar attributes found in the database.
8. Provide general advice on course selection and academic planning, augmented by trends and patterns observed in the retrieved data.
9. Maintain a neutral and objective tone, balancing positive and negative feedback from the retrieved reviews.
10. Respect privacy by not sharing personal information about professors beyond what's publicly available in the retrieved reviews.

When responding:
- Clearly distinguish between information directly retrieved from the database and your general knowledge or inferences.
- If the RAG system doesn't return relevant information for a query, acknowledge this and offer the best advice based on your general knowledge.
- Use specific examples, statistics, or quotes from reviews when they are available and relevant.
- Explain any limitations in the data (e.g., limited number of reviews, outdated information) when applicable.
- Encourage students to consider both the quantitative data (ratings, statistics) and qualitative information (review comments) in your recommendations.
- If there are conflicting reviews or ratings, acknowledge this and provide a balanced view.

Your goal is to leverage the power of RAG to provide students with the most accurate, up-to-date, and relevant information to help them make well-informed decisions about their course selections and professors, ultimately enhancing their academic experience and success.
`

export async function POST(req) {
    try {
        const data = await req.json()  // data is the JSON body of the incoming request (from sendMessage function in page.js)
        console.log("Received data:", data);

        // set up connection to Pinecone
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        })
        const index = pc.index('rag').namespace('ns1')

        // extract the user's latest query and create an embedding
        const latestQuery = data[data.length-1].content   // selects the most recent message from data, latest user query
        
        const result = await embeddingModel.embedContent(latestQuery);
        const embedding = result.embedding

        console.log("Generated embedding:", embedding)

        // use embedding to find similar professor reviews in Pinecone (returns a "matches" array with 3 of the most similar objects)
        const dbResults = await index.namespace("ns1").query({
            topK: 3,  // as specified by the systemPrompt
            includeMetadata: true,
            vector: embedding.values
        })

        console.log("Pinecone Query Results:", dbResults);

        // process the Pinecone results into a readable string
        let resultString = '\nHere are the returned results from vector database (done automatically):'
        dbResults.matches.forEach((match) => {  // obtains the matches array and for e/ object in matches
            resultString += `\n
            Professor: ${match.id}
            Review: ${match.metadata.review}
            Course: ${match.metadata.course}
            Rating: ${match.metadata.rating}
            \n
            `
        })

        console.log("Result String:", resultString)

        // prepare the Gemini request 
        const lastMessageContent = latestQuery + resultString  // combine user query with the pinecone results
        console.log("last Message with Content String:", lastMessageContent)

        const lastDataWithoutLastMessage = data.slice(0, data.length-1)  // contains all the elements from the original data array except the latest one
        console.log("previous messages:", lastDataWithoutLastMessage)

        // send the request to Gemini
        const geminiResponse = await textGenerationModel.generateContentStream({
            contents: [
                {
                    role: 'model',
                    parts: [{text: systemPrompt}],
                },
                // ...lastDataWithoutLastMessage,  // chat history (doesnt seem to work)
                {
                    role: 'user',
                    parts: [{text: lastMessageContent}],  
                },
            ],
        });
        
        // create a readable stream from the chat response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of geminiResponse.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            controller.enqueue(new TextEncoder().encode(chunkText));
                        }
                    }
                } catch (err) {
                    controller.error(err);
                } finally {
                    controller.close();
                }
            }
        });

        return new NextResponse(stream) 
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}