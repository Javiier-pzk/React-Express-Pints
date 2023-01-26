const express = require('express')
const app = express()
const PORT_NUMBER = process.env.PORT || 8080
const BASE_URL = 'https://cloud.iexapis.com/stable/stock'
const LOGO_URL = 'https://storage.googleapis.com/iex/api/logos'
const TOKEN_QUERY = '?token=pk_f6127aac223a4a309196101835d528c6'

app.get(`/`, async (req, res) => {
    const symbol = req.query.symbol
    const nameAndPriceResponse = await fetch(`${BASE_URL}/${symbol}/quote/${TOKEN_QUERY}`)
    const previousPriceResponse = await fetch(`${BASE_URL}/${symbol}/previous/${TOKEN_QUERY}`)
    const logoResponse = await fetch(`${LOGO_URL}/${symbol.toUpperCase()}.png`)
    const logoContentType = logoResponse.headers.get('Content-Type')
    const nameAndPrice = await nameAndPriceResponse.json()
    const previousPrice = await previousPriceResponse.json()
    const buffer = Buffer.from(await logoResponse.arrayBuffer())
    const companyLogoBase64 = `data:${logoContentType};base64, ${buffer.toString('base64')}`
    
    data = {
        key: nameAndPrice.symbol,
        companyName: nameAndPrice.companyName,
        latestPrice: nameAndPrice.latestPrice.toFixed(2),
        changePercent: (previousPrice.changePercent * 100).toFixed(2),
        change: previousPrice.change.toFixed(2),
        companyLogo: companyLogoBase64

    }
    console.log(data)
    res.send(data)
})

app.listen(PORT_NUMBER, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started on port ${PORT_NUMBER}`)
    }
})
