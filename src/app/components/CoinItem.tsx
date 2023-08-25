import { LineChart, Line, YAxis } from "recharts"
import { useMemo } from 'react'
import { useRouter } from "next/navigation"

export default function CoinItem(props: any) {

    const router = useRouter()
    const priceChange = props.coin.price_change_percentage_24h ? props.coin.price_change_percentage_24h.toFixed(2) : 0

    const lineGraphData = useMemo(() => {
        if (props.coin.sparkline_in_7d.price) {
            return props.coin.sparkline_in_7d.price.map((price: number) => {
                return ({ p: price })
            })
        }

        return []
    }, [props.coin])

    return (
        <li className="flex justify-start items-center cursor-pointer w-full p-3 gap-x-4 hover:bg-white/25 border-b"
            onClick={() => router.push(`/${props.coin.id}`)}>

            <span className="text-sm">{props.index}</span>
            <img src={props.coin.image} width={25} height={25} />
            <span className="grow">{props.coin.name}</span>
            <span className="text-xs text-stone-200">{(props.coin.symbol).toUpperCase()}</span>
            <span className={priceChange < 0 ? 'text-red-500' : 'text-green-500'}>{priceChange}%</span>

            <LineChart width={100} height={50} data={lineGraphData}>
                <YAxis type="number" domain={['auto', 'auto']} hide={true} />
                <Line type="monotone" dataKey="p" stroke="#8884d8" dot={false} />
            </LineChart>

        </li>
    )
}