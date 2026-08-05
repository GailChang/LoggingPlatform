'use client'
import { updateFilterGroup } from '@/domain/filter/store'
import { updateSearchId, useActiveLogStore } from '@/domain/logs/activeStore'
import { updateLoadingState, useLogsStore } from '@/domain/logs/store'
import {
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Dispatch, SetStateAction, useMemo } from 'react'

type TLogViewerProps = {
  toggleOpen: Dispatch<SetStateAction<boolean>>
}

const TableCell8em = ({ children, width, sx }: TableCellProps) => {
  return (
    <TableCell
      sx={{
        minWidth: '8em',
        ...(sx ?? {}),
      }}
      width={width ?? 'auto'}
    >
      {children}
    </TableCell>
  )
}
const TableCell6em = ({ children, width, sx }: TableCellProps) => {
  return (
    <TableCell
      sx={{
        minWidth: '6em',
        ...(sx ?? {}),
      }}
      width={width ?? 'auto'}
    >
      {children}
    </TableCell>
  )
}

export default function LogViewer({ toggleOpen }: TLogViewerProps) {
  const logs = useLogsStore((state) => state.logs)
  const isLoading = useLogsStore((state) => state.isLoading)
  const searchId = useActiveLogStore((state) => state.searchId)

  const displayLogs = useMemo(() => {
    return logs.map((log) => ({
      ...log,
      createTime: new Date(log.createTime),
    }))
  }, [logs])

  const handleRowClick = (id: string) => {
    updateSearchId(id)
    toggleOpen(true)
  }

  const total = useLogsStore((state) => state.total)
  const page = useLogsStore((state) => state.page)
  const pageSize = useLogsStore((state) => state.pageSize)

  const handlePageChange = (event: unknown, newPage: number) => {
    updateLoadingState(true)
    updateFilterGroup({ page: newPage })
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateLoadingState(true)
    updateFilterGroup({
      page: 0,
      pageSize: parseInt(event.target.value, 10),
    })
  }

  return (
    <>
      <Table
        sx={{
          marginTop: '1rem',
          tableLayout: 'fixed',
          '& .MuiTableCell-body, & .MuiTableCell-head': {
            p: '.6rem',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell6em sx={{ width: { xs: '30%', md: '20%', lg: '12%' } }}>
              時間
            </TableCell6em>
            <TableCell6em
              sx={{
                textAlign: 'center',
                width: { xs: '30%', md: '16%', lg: '12%' },
              }}
            >
              等級
            </TableCell6em>
            <TableCell
              sx={{
                textAlign: 'center',
                width: { xs: '30%', md: '16%', lg: '12%' },
              }}
            >
              類型
            </TableCell>
            <TableCell sx={{ width: { xs: '30%', md: '32%', lg: '52%' } }}>
              訊息
            </TableCell>
            <TableCell8em sx={{ width: { xs: '30%', md: '16%', lg: '12%' } }}>
              來源
            </TableCell8em>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                align='center'
                colSpan={5}
                sx={{ p: 2, height: '60vh' }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : displayLogs.length == 0 ? (
            <TableRow>
              <TableCell
                align='center'
                colSpan={5}
                sx={{ p: 2, height: '60vh' }}
              >
                <Typography variant='h3'>No Data</Typography>
              </TableCell>
            </TableRow>
          ) : (
            displayLogs.map((log) => (
              <TableRow
                component='tr'
                key={log.id}
                hover
                onClick={() => handleRowClick(log.id)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    log.id == searchId ? 'action.selected' : 'transparent',
                }}
              >
                <TableCell sx={{ p: '.5rem' }}>
                  {log.createTime.toLocaleString()}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={log.level}
                    color={
                      log.level === 'ERROR'
                        ? 'error'
                        : log.level === 'WARN'
                          ? 'warning'
                          : 'default'
                    }
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip variant='outlined' label={log.type} />
                </TableCell>
                <TableCell
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {log.messages}
                </TableCell>
                <TableCell>{log.sourceSystem}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component={'div'}
        labelRowsPerPage='每頁顯示：'
        count={total}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  )
}
