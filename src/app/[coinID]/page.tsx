'use client'
import { useEffect, useState, useMemo } from "react"
import { setFromRequest } from "../utils/utils"
import parse from 'html-react-parser';
import CustomAreaChart from "./components/CustomAreaChart";

interface GraphPoint {
    Date: number
    Price: number
    MarketCap: number
    Volume: number
}

export default function Page({ params }: { params: { coinID: string } }) {

    const [coinInfo, setCoinInfo]: [any, any] = useState(null)
    const [coinHistory, setCoinHistory]: [any, any] = useState(null)

    const HISTORY_DAYS = 365

    const historyGraphData = useMemo(() => {

        if (coinHistory) {
            let data: GraphPoint[] = []

            for (let i = 0; i < coinHistory.prices.length; i++) {
                data.push({ Date: coinHistory.prices[i][0], Price: coinHistory.prices[i][1], MarketCap: coinHistory.market_caps[i][1], Volume: coinHistory.total_volumes[i][1] })
            }

            return data
        }

        return []
    }, [coinHistory])

    useEffect(() => {
        setFromRequest(`https://api.coingecko.com/api/v3/coins/${params.coinID}?localization=false`, setCoinInfo)
        setFromRequest(`https://api.coingecko.com/api/v3/coins/${params.coinID}/market_chart?vs_currency=usd&days=${HISTORY_DAYS}&interval=daily&precision=full`, setCoinHistory)
    }, [])

    return <div className="flex flex-col justify-center items-center p-5 md:w-3/5">

        {!coinInfo ? null : <>

            <span>Rank #{coinInfo.coingecko_rank}</span>
            <div className="flex justify-center items-center gap-2">
                <img src={coinInfo.image.thumb} />
                <span className="text-xl">{coinInfo.name} ({coinInfo.symbol.toUpperCase()})</span>
                <span className="text-4xl">${coinInfo.tickers.length > 0 ? coinInfo.tickers[0].last : 0}</span>
            </div>
        </>}

        <CustomAreaChart graphData={historyGraphData} /> 

        {!coinInfo ? null : <div className="flex flex-col gap-4">
            {coinInfo.categories.length > 0 ?
                <div>
                    <span>Tags:</span>
                    <div className="flex gap-1 flex-wrap">
                        {coinInfo.categories.map((category: string) => { return <span className="px-1 text-xs bg-black/75">{category}.</span> })}
                    </div>
                </div> : null}

            <p>{parse(coinInfo.description.en)}</p>
        </div>}

    </div>
}