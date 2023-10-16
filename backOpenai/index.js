import {Configuration, OpenAIApi} from 'openai'

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: "org-6dDOD4aXXfz9FZrUfTtOEItR",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {

    const {query}= req.body
    try{
        const completion = await openai.createChatCompletion(
            {model: "gpt-3.5-turbo",messages: [{role: "user", content: query},]
            }
        )
      res.status(200).json({
        success: true,
        data: completion.data.choices[0].message.content,
      });
      console.log(completion.data.choices[0].message.content)
  
    }catch(error){
      if (error.response) {
        console.error('Réponse d\'erreur du serveur OpenAI :', error.response.data);
        res.json({ error: "Une erreur s\'est produite", details: error.message });
    } else if (error.request) {
        console.error('Aucune réponse reçue :', error.request);
        res.json({ error: "Une erreur s\'est produite", details: error.message });
    } else {
        console.error('Erreur de requête :', error.message);
        res.json({ error: "Une erreur s\'est produite", details: error.message });
    }
    }
  });

app.listen(port, () => {
    console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
  });