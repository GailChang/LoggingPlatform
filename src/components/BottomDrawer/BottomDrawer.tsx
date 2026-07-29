'use client'
import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { Dispatch, SetStateAction } from 'react'

type TDrawerProps = {
  open: boolean
  container?: SwipeableDrawerProps['container']
  children?: SwipeableDrawerProps['children']
  toggleOpen: Dispatch<SetStateAction<boolean>>
}

export const drawerBleeding = 40

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}))

const Puller = styled('div')(({ theme }) => ({
  width: 46,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 23px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}))

export default function BottomDrawer({
  open,
  container,
  children,
  toggleOpen,
}: TDrawerProps) {
  return (
    <>
      <SwipeableDrawer
        id='swDrawer'
        anchor='bottom'
        disablePortal
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
          container: container,
        }}
        onClose={() => toggleOpen(false)}
        onOpen={() => toggleOpen(true)}
        open={open}
        slotProps={{
          backdrop: {
            sx: {
              position: 'absolute',
            },
          },
          paper: {
            sx: {
              position: 'absolute',
              height: `calc(100% - ${drawerBleeding}px - 40px)`,
              overflow: 'visible',
            },
          },
          swipeArea: {
            onClick: () => toggleOpen((prev) => !prev),
            sx: { position: 'absolute' },
          },
        }}
        swipeAreaWidth={40}
        sx={{
          position: 'absolute',
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            minHeight: '40px',
            boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Puller />
        </StyledBox>
        {children}
      </SwipeableDrawer>
    </>
  )
}
