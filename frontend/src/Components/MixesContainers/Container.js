import React from 'react'
import "../../Styles/scss/Container.scss"

export default function Container({children}) {
  return (
    <div className={"Container"}>
        {children}
    </div>
  )
}
