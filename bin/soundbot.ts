#!/usr/bin/env node
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import Container from '~/util/Container';
import localize from '~/util/i18n/localize';

const { config, soundBot: bot } = Container;

localize.setLocale(config.language);
bot.start();

console.info(localize.t('url', { clientId: config.clientId }));

const app = express();
const port = 3000;

const jsonParser = bodyParser.json()

app.use(cors())
app.use(express.static('./interface/public'))

app.get('/sounds', (_req, res) => {
    const sounds = bot.getSoundsForWeb();
    res.status(200).json(sounds)
})

app.post('/sound', jsonParser, (req, res) => {
    // TODO: Add the guildId param, needed to check if the bot is in a specific channel
    const { sound, /* guildId */ } = req.body;

    const status = bot.playFromWeb(sound, /* guildId */);
    switch (status) {
        case ("success"): {
            res.status(200).json({ ...req.body, success: true })
            break;
        }
        case ("sound_not_found"): {
            res.status(500).json({ error: 'sound_not_found', success: false })
            break;
        }
        case ("not_in_voice_channel"): {
            res.status(500).json({ error: 'not_in_voice_channel', success: false })
            break;
        }
        default: {
            res.status(500).json({ error: 'unknown_error', success: false })
            break;
        }
    }
})

app.listen(port, () => {
    console.info(`Interface at http://localhost:${port}`)
})
