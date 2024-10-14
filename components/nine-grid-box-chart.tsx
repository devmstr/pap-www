'use client'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  registerables,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line, Scatter } from 'react-chartjs-2'
import { Dictionary } from '@/types'
import { ZoomableIframe } from './zoomable-iframe'
import { Selector } from './selector'
import { Label } from './ui/label'
import { Icons } from './icons'

export const nineGridBackground = {
  id: 'nine-grid-background',
  beforeDatasetsDraw: (chart: ChartJS) => {
    const ctx = chart.ctx
    const xAxis = chart.scales.x
    const yAxis = chart.scales.y

    if (!xAxis || !yAxis) return

    const quadrants = [
      { x: 0, y: 0, color: 'rgba(228, 243, 249,0.3)' }, // Top left
      { x: 50, y: 0, color: 'rgba(238, 234, 254,0.3)' }, // Top right
      { x: 0, y: 50, color: 'rgba(238, 234, 254,0.3)' }, // Bottom left
      { x: 50, y: 50, color: 'rgba(233, 225, 252,0.3)' } // Bottom right
    ]

    ctx.save()

    quadrants.forEach((quadrant) => {
      ctx.fillStyle = quadrant.color
      ctx.fillRect(
        xAxis.getPixelForValue(quadrant.x),
        yAxis.getPixelForValue(quadrant.y),
        xAxis.getPixelForValue(50) - xAxis.getPixelForValue(0),
        yAxis.getPixelForValue(50) - yAxis.getPixelForValue(0)
      )
    })

    ctx.restore()
  }
}
export const xAxisLabelPlugin = {
  id: 'x-axis-label',
  afterDraw: (chart: ChartJS) => {
    const {
      ctx,
      chartArea: { top, left, right, bottom },
      scales: { x, y }
    } = chart
    ctx.save()
    ctx.font = '12px '
    ctx.fillStyle = 'rgba(107, 114, 128, 0.35)'
    ctx.textAlign = 'center'
    ctx.fillText('Low', x.getPixelForValue(25), top - 1)
    ctx.fillText('Medium', x.getPixelForValue(50), top - 1)
    ctx.fillText('Hight', x.getPixelForValue(75), top - 1)
    // vertical text
    ctx.save()
    ctx.translate(right + 9, y.getPixelForValue(25))
    ctx.rotate(-Math.PI / 2) // Rotate 90 degrees counter-clockwise
    ctx.textAlign = 'center'
    ctx.fillText('Low', 0, 0)
    ctx.restore()

    ctx.save()
    ctx.translate(right + 9, y.getPixelForValue(50))
    ctx.rotate(-Math.PI / 2) // Rotate 90 degrees counter-clockwise
    ctx.fillText('Medium', 0, 0)
    ctx.restore()

    ctx.save()
    ctx.translate(right + 9, y.getPixelForValue(75))
    ctx.rotate(-Math.PI / 2) // Rotate 90 degrees counter-clockwise
    ctx.fillText('Hight', 0, 0)
    ctx.restore()
  }
}

// 4 grid customization
export const nineGridLabels = {
  id: 'nine-grid-box-customization',
  beforeDatasetsDraw: (chart: ChartJS) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
      scales: { x, y }
    } = chart
    const fourLabels = [
      { name: 'Mismatch Talent', x: 25, y: 25 },
      { name: 'Expert Talent', x: 75, y: 25 },
      { name: 'Potential Talent', x: 25, y: 75 },
      { name: 'Top Talent', x: 75, y: 75 }
    ]
    ctx.save()
    ctx.font = '12px'
    ctx.fillStyle = 'rgba(107, 114, 128,0.6)'
    ctx.textAlign = 'center'

    fourLabels.forEach(({ name, x: xCoord, y: yCoord }) => {
      ctx.fillText(name, x.getPixelForValue(xCoord), y.getPixelForValue(yCoord))
    })
  }
}

ChartJS.register(
  ...registerables,
  LinearScale,
  nineGridBackground,
  nineGridLabels,
  xAxisLabelPlugin
)

// export const options = {
//   layout: {
//     padding: 10
//   },
//   usePointStyle: true,
//   pointHitRadius: 40,
//   // @ts-ignore
//   pointStyle: (ctx) => {
//     const imageUrl = ctx.raw.image
//     const img = new Image(40, 40)
//     img.src = imageUrl
//     return img
//   },
//   aspectRatio: 7 / 5,
//   scales: {
//     x: {
//       min: 0,
//       max: 100,
//       beginAtZero: true,
//       afterTickToLabelConversion: function (ctx: any) {
//         ctx.ticks = []
//         ctx.ticks.push({ value: 50, label: '' })
//       },
//       grid: {
//         drawTicks: false
//       },
//       border: {
//         width: 2,
//         dash: [6, 9]
//       },
//       title: {
//         display: true,
//         text: 'Performance'
//       }
//     },
//     y: {
//       min: 0,
//       max: 100,
//       beginAtZero: true,
//       afterTickToLabelConversion: function (ctx: any) {
//         ctx.ticks = []
//         ctx.ticks.push({ value: 50, label: '' })
//       },
//       grid: {
//         drawTicks: false
//       },
//       border: {
//         width: 2,
//         dash: [6, 9]
//       },
//       title: {
//         display: true,
//         text: 'Potential'
//       }
//     }
//   },
//   plugins: {
//     nineGridBackground,
//     nineGridLabels,
//     xAxisLabelPlugin,
//     tooltip: {
//       callbacks: {
//         title: (ctx: any) =>
//           `${ctx[0].raw.displayName}\n(${ctx[0].raw.position})`,
//         label: () => '' // Hide the default label
//       },
//       displayColors: false // Hide the color box
//     },
//     legend: {
//       display: false
//     }
//   }
// }

interface NineGridBoxProps {
  data: {
    label: string
    data: {
      x: number
      y: number
      image: string
      displayName: string
      position: string
    }[]
  }[]
}

export const NineGridBox: React.FC<NineGridBoxProps> = ({
  data
}: NineGridBoxProps) => {
  const [dataSet, setDataSet] = useState(
    data.filter((d) => d.label === data.map((i) => i.label)[0])
  )
  const [department, setDepartment] = useState(data.map((i) => i.label)[0])
  const departments = data.map((i) => i.label)

  const [loadedImages, setLoadedImages] = useState<unknown[]>([])

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await Promise.all(
          dataSet
            .filter((d) => d.label === department)[0]
            .data.map((item) => {
              return new Promise((resolve, reject) => {
                const image = new Image()
                image.src = item.image
                image.onload = () => resolve(image)
                image.onerror = () => reject(image)
              })
            })
        )
        setLoadedImages(images)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadImages()
  }, []) // Empty dependency array ensures the effect runs only once

  const options = {
    layout: {
      padding: 10
    },
    usePointStyle: true,
    pointHitRadius: 40,
    // @ts-ignore
    pointStyle: (context: any) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Retrieve the loaded image for the current data point
      const image = loadedImages[context.dataIndex] as CanvasImageSource
      if (!ctx) return undefined

      // Set canvas dimensions
      canvas.width = 40 // Adjust width as needed
      canvas.height = 40 // Adjust height as needed

      // Draw a circular clip path on the canvas
      const radius = 20 // Define the radius of the circle
      ctx.beginPath()
      ctx.arc(radius, radius, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // Draw the image onto the canvas within the circular clip path
      if (image) ctx.drawImage(image, 0, 0, radius * 2, radius * 2)
      // Return the canvas element
      return canvas
    },
    aspectRatio: 7 / 5,
    scales: {
      x: {
        min: 0,
        max: 100,
        beginAtZero: true,
        afterTickToLabelConversion: function (ctx: any) {
          ctx.ticks = []
          ctx.ticks.push({ value: 50, label: '' })
        },
        grid: {
          drawTicks: false
        },
        border: {
          width: 2,
          dash: [6, 9]
        },
        title: {
          display: true,
          text: 'Performance'
        }
      },
      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
        afterTickToLabelConversion: function (ctx: any) {
          ctx.ticks = []
          ctx.ticks.push({ value: 50, label: '' })
        },
        grid: {
          drawTicks: false
        },
        border: {
          width: 2,
          dash: [6, 9]
        },
        title: {
          display: true,
          text: 'Potential'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (ctx: any) =>
            `${ctx[0].raw.displayName}\n(${ctx[0].raw.position})`,
          label: () => '' // Hide the default label
        },
        displayColors: false // Hide the color box
      },
      legend: {
        display: false
      },
      nineGridBackground,
      nineGridLabels,
      xAxisLabelPlugin
    }
  }

  return (
    <div className="">
      <div className="hidden md:flex flex-col gap-5">
        <div className="flex justify-end">
          <div className="w-full max-w-xs flex items-center gap-5 pr-[10px]">
            <Label htmlFor="departments" className="text-gray-500/50">
              Departments
            </Label>
            <Selector
              value={department}
              setValue={(value) => {
                setDepartment(value)
                setDataSet(data.filter((d) => d.label === value))
              }}
              items={departments}
              id="departments"
            />
          </div>
        </div>
        <Scatter
          updateMode="show"
          options={options}
          data={{
            datasets: [...dataSet]
          }}
        />
      </div>
      <div className="md:hidden flex gap-3 justify-center items-center py-8">
        <Icons.sorryEmoji className=" w-4 h-4 md:w-5 md:h-5 text-muted-foreground/40" />
        <p className="flex text-xs  md:text-sm text-muted-foreground/40 ">
          Sorry you can see grid chart only in big screens.
        </p>
      </div>
    </div>
  )
}
