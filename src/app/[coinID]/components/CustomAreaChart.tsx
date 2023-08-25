import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react'

export default function CustomAreaChart(params: any) {
    const xInterval = Math.ceil(100 - (window.innerWidth / 100))
    const [selectedData, setSelectedData] = useState('Price')

    const yTickFormatter = (value: number) => {
        if (value > 999999) {
            const m = value / 1000000
            return m + 'M'

        } else if (value > 99999) {
            const k = value / 1000
            return k + 'K'

        } else {
            return '$' + value
        }
    }

    const xTickFormatter = (value: number) => {
        const date = new Date(value)
        const year = date.getFullYear() + ''

        return date.getMonth() + '/' + year.slice(2,)
    }

    return (<>
        <ToggleButtonGroup
            value={selectedData}
            exclusive
            onChange={(e, value) => { if (value !== null) { setSelectedData(value) } }}
            color="secondary"
            sx={{ button: { color: '#ffffff', padding: '5px 10px' }, backgroundColor: 'rgba(255,255,255,0.10)', m: 2 }}
        >
            <ToggleButton value="Price" >
                Price
            </ToggleButton>
            <ToggleButton value="Volume" >
                Volume
            </ToggleButton>
            <ToggleButton value="MarketCap">
                Market Cap
            </ToggleButton>
        </ToggleButtonGroup>

        <ResponsiveContainer width={'90%'} height={500}>
            <AreaChart data={params.graphData}>
                <defs>
                    <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E32D2D" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#E32D2D" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="Date" interval={xInterval} tickFormatter={xTickFormatter} />
                <YAxis type="number" domain={['auto', 'auto']} tickFormatter={yTickFormatter} />
                <Tooltip />
                <Area type="monotone" dataKey="Price" stroke="#E32D2D" fillOpacity={1} fill="url(#colorG)" hide={selectedData !== 'Price'} />
                <Area type="monotone" dataKey="Volume" stroke="#E32D2D" fillOpacity={1} fill="url(#colorG)" hide={selectedData !== 'Volume'} />
                <Area type="monotone" dataKey="MarketCap" stroke="#E32D2D" fillOpacity={1} fill="url(#colorG)" hide={selectedData !== 'MarketCap'} />
            </AreaChart>
        </ResponsiveContainer>
    </>)
}