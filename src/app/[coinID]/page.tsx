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

    return <div className="flex flex-col justify-center items-center p-5 w-full md:w-3/5 gap-8 mb-16">

        {!coinInfo ?
            <div className="flex justify-center items-center gap-2 bg-neutral-800 w-2/3 h-12 animate-pulse rounded-lg transition-all"></div>
            :
            <div className="flex justify-center items-center gap-2 w-full">
                <img src={coinInfo.image.thumb} />
                <span className="text-xl">{coinInfo.name} ({coinInfo.symbol.toUpperCase()})</span>
                <span className="text-4xl">${coinInfo.tickers.length > 0 ? coinInfo.tickers[0].last : 0}</span>
            </div>
        }

        {!coinInfo ?
            <div className="flex justify-center items-center gap-2 bg-neutral-800 w-2/3 h-48 animate-pulse rounded-lg transition-all"></div>
            :
            <CustomAreaChart graphData={historyGraphData} />}

        {!coinInfo ?
            <div className="flex justify-center items-center gap-2 bg-neutral-800 w-2/3 h-96 animate-pulse rounded-lg transition-all"></div>
            : <div className="flex flex-col gap-4">
                {coinInfo.categories.length > 0 ?
                    <div>
                        <span>Tags:</span>
                        <div className="flex gap-1 flex-wrap">
                            {coinInfo.categories.map((category: string, i: number) => { return <span key={i} className="px-3 py-1 text-xs bg-black/75 border border-neutral-600 rounded-full">{category}.</span> })}
                        </div>
                    </div> : null}

                <p>{parse(coinInfo.description.en)}</p>
            </div>}

    </div>
}