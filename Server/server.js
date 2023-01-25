const express = require('express')
const app = express()
const PORT_NUMBER = process.env.PORT || 8080
const BASE_URL = 'https://cloud.iexapis.com/stable/stock'
const LOGO_URL = 'https://storage.googleapis.com/iex/api/logos'
const TOKEN_QUERY = '?token=pk_f6127aac223a4a309196101835d528c6'

app.get(`/`, async (req, res) => {
    const symbol = req.query.symbol
    const nameAndPriceResponse = fetch(`${BASE_URL}/${symbol}/quote/${TOKEN_QUERY}`)
    const previousPriceResponse = fetch(`${BASE_URL}/${symbol}/previous/${TOKEN_QUERY}`)
    const logoResponse = fetch(`${LOGO_URL}/${symbol.toUpperCase()}.png`)
    const nameAndPrice = await (await nameAndPriceResponse).json()
    const previousPrice = await (await previousPriceResponse).json()
    const companyLogo = await (await logoResponse).blob()
          
    data = {
        symbol: nameAndPrice.symbol,
        companyName: nameAndPrice.companyName,
        latestPrice: nameAndPrice.latestPrice,
        changePercent: previousPrice.changePercent,
        change: previousPrice.change,
        companyLogo: companyLogo
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
