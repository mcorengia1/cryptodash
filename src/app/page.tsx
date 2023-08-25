'use client'
import { useEffect, useState } from "react"
import CoinItem from "./components/CoinItem";
import Pagination from '@mui/material/Pagination';
import { setFromRequest } from "./utils/utils";

export default function Home() {

  const [selectedCoins, setSelectedCoins] = useState([])
  const [coinsList, setCoinsList] = useState([])
  const [coinsPage, setCoinsPage] = useState(1)

  const VALUES_PER_PAGE = 25

  useEffect(() => {
    setFromRequest(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${VALUES_PER_PAGE}&page=${coinsPage}&sparkline=true&locale=en`, setSelectedCoins)
  }, [coinsPage])

  useEffect(() => {
    setFromRequest('https://api.coingecko.com/api/v3/coins/list', setCoinsList)
  }, [])

  return (
    <main className='flex justify-center items-center flex-col w-full'>

      <div className="flex flex-col justify-center items-center w-full md:w-3/5 my-6">
        {selectedCoins.map((coin, i) => <CoinItem coin={coin} index={i + VALUES_PER_PAGE * (coinsPage - 1)} />)}
      </div>

      <Pagination color="primary" sx={{ button: { color: '#ffffff' } }} count={Math.ceil(coinsList.length / VALUES_PER_PAGE)}
        page={coinsPage} onChange={(e, value) => setCoinsPage(value)} />

    </main>
  )
}
