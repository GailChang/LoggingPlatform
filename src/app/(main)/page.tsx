'use client'

import BarChart from '@/components/BarChart'
import HeatMap from '@/components/HeatMap'
import { updateHomeFilter, useHomeFilter } from '@/domain/dashboard/filterStore'
import { hasValueString } from '@/domain/shared/checkValueUtility'
import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'

const SOURCE_SYSTEM_OPTION = [
  {
    value: '服務A',
    label: '服務A',
  },
  {
    value: '服務B',
    label: '服務B',
  },
  {
    value: '服務C',
    label: '服務C',
  },
] as const

let __seed = 0x11a2c3d4
function rand() {
  __seed |= 0
  __seed = (__seed + 0x6d2b79f5) | 0
  let t = Math.imul(__seed ^ (__seed >>> 15), 1 | __seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
function generateData(count: number, yrange: { max: number; min: number }) {
  let i = 0
  const series = []
  while (i < count) {
    const x = 'w' + (i + 1).toString()
    const y = Math.floor(rand() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x: x,
      y: y,
    })
    i++
  }
  return series
}

export default function Home() {
  const filterStore = useHomeFilter((state) => state)
  const [sourceSystem, setSourceSystem] = useState<string>(
    filterStore.sourceSystem ?? ''
  )
  const [sourceSystemError, setSourceSystemError] = useState<boolean>(
    sourceSystem === ''
  )

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSourceSystem(event.target.value)
    setSourceSystemError(hasValueString(event.target.value) === false)
    updateHomeFilter({ sourceSystem: event.target.value })
  }

  return (
    <Container>
      <Grid container sx={{ margin: '.5em 0' }}>
        <Grid size={{ sm: 6, md: 3 }}>
          <FormControl error={sourceSystemError} fullWidth>
            <InputLabel id='select-source-system-label'>所屬服務</InputLabel>
            <Select
              id='select-source-system'
              name='sourceSystem'
              label='所屬服務'
              labelId='select-source-system-label'
              value={sourceSystem}
              aria-describedby='source-system-helper-text'
              onChange={handleSourceChange}
            >
              {SOURCE_SYSTEM_OPTION.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              id='source-system-helper-text'
              sx={{
                display: sourceSystemError ? 'flex' : 'none',
              }}
            >
              請選擇要顯示圖表的服務
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={sourceSystemError ? 0 : 12}>
          <BarChart
            data={[
              {
                name: 'Error log',
                data: [0, 10, 2, 4, 0, 0, 0, 5, 1],
              },
            ]}
            options={{
              chartHeight: 150,
              bar: {
                horizental: false,
              },
              categories: [
                '13:14',
                '13:15',
                '13:16',
                '13:17',
                '13:18',
                '13:19',
                '13:20',
                '13:21',
                '13:22',
              ],
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + ' 個'
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid size={sourceSystemError ? 0 : 6}>
          <HeatMap
            data={[
              {
                name: 'Error',
                data: generateData(24, {
                  min: 0,
                  max: 90,
                }),
              },
              {
                name: 'Warn',
                data: generateData(24, {
                  min: 0,
                  max: 90,
                }),
              },
              {
                name: 'Info',
                data: generateData(24, {
                  min: 0,
                  max: 90,
                }),
              },
              {
                name: 'Debug',
                data: generateData(24, {
                  min: 0,
                  max: 90,
                }),
              },
            ]}
            options={{
              chartHeight: 300,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
