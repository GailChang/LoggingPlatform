import {
  hasValueNumber,
  hasValueString,
} from '@/domain/shared/checkValueUtility'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

type THeatmap = {
  options: THeatmapOptions
  data: THeatmapData[]
}

type THeatmapOptions = {
  chartHeight?: number
  color?: string
  title?: string
}

type THeatmapData = {
  name: string
  data: {
    x: string
    y: number
  }[]
}

// Seeded PRNG so the heatmap is identical on every load (stable snapshots).

export default function HeatMap({ options, data }: THeatmap) {
  const [state] = React.useState({
    series: data,
    options: {
      dataLabels: {
        enabled: false,
      },
      colors: [hasValueString(options.color) ? options.color : '#008FFB'],
      title: {
        text: options.title,
      },
    } as ApexOptions,
  })

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          type='heatmap'
          height={
            hasValueNumber(options.chartHeight) ? options.chartHeight : 350
          }
          options={state.options}
          series={state.series}
        />
      </div>
    </div>
  )
}
