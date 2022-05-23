import React from 'react'

export default function Name({className, length, name}) {
  return (
    <p className={className}>
        { length > 12 ? name.substring(0,12)+"..." : name}
    </p>
  )
}
