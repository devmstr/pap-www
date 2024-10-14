'use client'

import { cn } from '@/lib/utils'
import {
  Filler,
  Legend,
  LineElement,
  PointElement,
  Chart as RadarJS,
  RadialLinearScale,
  Tooltip
} from 'chart.js'
import { HtmlHTMLAttributes, useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { Loading } from './loading'
import { Switcher } from './switcher'
import { ZoomableIframe } from './zoomable-iframe'

RadarJS.register(
  RadialLinearScale,
  PointElement,
  Filler,
  Tooltip,
  LineElement,
  Legend
)

const options = {
  scales: {
    r: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    'nine-grid-background': false,
    'x-axis-label': false,
    'nine-grid-box-customization': false
  }
}

interface RadarChartProps extends HtmlHTMLAttributes<HTMLDivElement> {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
      hidden: boolean
    }[]
  }
}

export function RadarChart({ data, className }: RadarChartProps) {
  const [isManagerChartActive, setIsManagerChartActive] = useState(true)
  const [isYouChartActive, setIsYouChartActive] = useState(true)
  const [chartData, setChartData] = useState(data)

  const toggleDataset = (label: string) => {
    setChartData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset) =>
        dataset.label === label
          ? { ...dataset, hidden: !dataset.hidden }
          : dataset
      )
    }))
  }

  useEffect(() => {
    if (!isManagerChartActive) setIsManagerChartActive(true)
    if (!isYouChartActive) setIsYouChartActive(true)
    setChartData(data)
  }, [data])

  return (
    <div className={cn('flex w-full flex-col px-4 gap-3 ', className)}>
      <div className="flex gap-4 justify-end w-full">
        <Switcher
          label={data.datasets[0]?.label}
          className="data-[state=checked]:bg-[#fe5808]"
          checked={isYouChartActive}
          onCheckedChange={(checked) => {
            setIsYouChartActive(checked)
            toggleDataset(data.datasets[0]?.label)
          }}
        />
        <Switcher
          label={data.datasets[1]?.label}
          checked={isManagerChartActive}
          onCheckedChange={(checked) => {
            setIsManagerChartActive(checked)
            toggleDataset(data.datasets[1]?.label)
          }}
        />
      </div>
      <ZoomableIframe>
        <Radar
          className="w-full  max-w-[600px] max-h-[600px] "
          data={chartData}
          options={options}
          updateMode="show"
          fallbackContent={<Loading message="Something went Wrong..." />}
        />
      </ZoomableIframe>
    </div>
  )
}
