const getSounds = async () => {
    try {
        const resp = await fetch(`http://${process.env.SERVER_URL}/sounds`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const content = await resp.json()
        return content;
    } catch (error) {
        return null;
    }
}

const sendSound = async (searchValue: string) => {
    try {
        const resp = await fetch(`http://${process.env.SERVER_URL}/sound`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sound: searchValue,
                guildId: process.env.DISCORD_GUILD_ID
            })
        })
        const content = await resp.json()
        return content;
    } catch (error) {
        return null;
    }
};

const api = {
    getSounds,
    sendSound,
};

export default api;