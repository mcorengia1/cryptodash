'use client'
import { useEffect, useState } from "react"
import CoinItem from "./components/CoinItem";
import Pagination from '@mui/material/Pagination';
import { setFromRequest } from "./utils/utils";

export default function Home() {

  const [selectedCoins, setSelectedCoins] = useState([])
  const [coinsList, setCoinsList] = useState([])
  const [coinsPage, setCoinsPage] = useState(1)
  const [error, setError] = useState(200)

  const VALUES_PER_PAGE = 15

  useEffect(() => {
    setFromRequest(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${VALUES_PER_PAGE}&page=${coinsPage}&sparkline=true&locale=en`, setSelectedCoins)
  }, [coinsPage])

  useEffect(() => {
    setFromRequest('https://api.coingecko.com/api/v3/coins/list', setCoinsList)
  }, [])

  return (
    <main className='flex justify-center items-center flex-col w-full min-h-screen max-w-7xl gap-4 mb-16'>

      {selectedCoins === null || coinsList === null ?

        <>
          <h3 className="text-4xl font-bold text-center">Ocurrio un error al hacer la request</h3>
          <p className="text-2xl font-semibold text-center">Probablemente hayas superado el limite de requests que se pueden hacer a la
            version gratuita de la API de Coingecko.</p>
          <p className="text-2xl font-semibold text-center">Vas a tener que esperar un poco para volver a intentarlo :P</p>
        </>

        : selectedCoins.length === 0 || coinsList.length === 0 ?
          <div className="flex justify-center items-center bg-neutral-800 w-full md:w-3/5 h-screen animate-pulse rounded-lg transition-all"></div>

          : <>
            <ul className="flex flex-col justify-center items-center w-full md:w-3/5 my-6">
              {selectedCoins.map((coin, i) => <CoinItem coin={coin} index={i + VALUES_PER_PAGE * (coinsPage - 1)} key={i} />)}
            </ul>

            <Pagination color="primary" sx={{ button: { color: '#ffffff' } }} count={Math.ceil(coinsList.length / VALUES_PER_PAGE)}
              page={coinsPage} onChange={(e, value) => setCoinsPage(value)} />
          </>
      }

    </main>
  )
}