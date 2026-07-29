'use client'
import { Global } from '@emotion/react'
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

const drawerBleeding = 40

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
  if (container == null) {
    console.log('container is null')
    return
  }

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        id='swDrawer'
        anchor='bottom'
        disableSwipeToOpen={false}
        ModalProps={{
          container: container,
          style: {
            position: 'absolute',
          },
          keepMounted: true,
        }}
        onClose={() => toggleOpen(false)}
        onOpen={() => toggleOpen(true)}
        open={open}
        slotProps={{
          backdrop: {
            style: {
              position: 'absolute',
            },
          },
          paper: {
            style: {
              position: 'absolute',
            },
          },
        }}
        swipeAreaWidth={drawerBleeding}
      >
        <StyledBox
          onClick={() => toggleOpen((prev) => !prev)}
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            pointerEvents: 'auto',
            minHeight: '40px',
          }}
        >
          <Puller />
        </StyledBox>
        {children}
      </SwipeableDrawer>
    </>
  )
}
