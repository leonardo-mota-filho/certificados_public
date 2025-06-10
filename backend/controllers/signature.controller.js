export async function getImage(req,res){
    try {
        const url = decodeURIComponent(req.params.url);
        console.log("URL:" + url)
        if (!url) {
            return res.status(400).send('URL da imagem não fornecida');
        }

        const response = await fetch(url);
        
        // se resposta não é OK
        if (!response.ok) {
            throw new Error(`Erro ao buscar imagem: ${response.statusText}`);
        }

        //buffer da imagem
        const imageBuffer = await response.arrayBuffer();
        
        const contentType = response.headers.get('content-type') || 'image/png';
        res.set('Content-Type', contentType);
        
        // Envia a imagem como resposta
        res.send(Buffer.from(imageBuffer).toString('base64'));
    } catch (error) {
        console.error('Erro no proxy:', error);
        res.status(500).send('Erro ao carregar a imagem');
    }
}