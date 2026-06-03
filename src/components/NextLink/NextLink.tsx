'use client'
import Link, { LinkProps } from 'next/link'
import { CSSProperties } from 'react'

type NextLinkProps = LinkProps & {
  style?: CSSProperties
  color?: string
  children: React.ReactNode
}

export default function NextLink({ style, color, children, ...props }: NextLinkProps) {
  const colorApply = color ? color : "white"

  return (
    <Link
      {...props}
      style={{
        textDecoration: 'none',
        color: colorApply,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </Link>
  )
}
