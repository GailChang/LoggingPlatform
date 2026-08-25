'use client'

import { hasValueString } from '@/domain/shared/checkValueUtility'
import { ApexOptions, ApexTooltip } from 'apexcharts'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

type TBarChart = {
  options: TBarChartOptions
  data: TBarData[]
}

type TBarChartOptions = {
  chartHeight?: number
  bar: {
    horizental: boolean
    columnWidth?: string
    borderRadius?: number
    borderRadiusApplication?: 'around' | 'end' | undefined
  }
  categories: string[]
  yTitle?: string
  tooltip?: ApexTooltip | undefined
}

type TBarData = { name: string; data: number[] }

export default function BarChart({ options, data }: TBarChart) {
  const [state, setState] = useState({
    series: data,
    options: {
      plotOptions: {
        bar: {
          horizontal: options.bar.horizental,
          columnWidth: options.bar.columnWidth ?? '50%',
          borderRadius: options.bar.borderRadius ?? 5,
          borderRadiusApplication: options.bar.borderRadiusApplication ?? 'end',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: options.categories,
      },
      yaxis: {
        title: {
          text: hasValueString(options.yTitle) ? options.yTitle : '',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: options.tooltip,
    } as ApexOptions,
  })

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          type='bar'
          height={options.chartHeight ?? 350}
          options={state.options}
          series={state.series}
        />
      </div>
    </div>
  )
}
