import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const CreatePortalWrap = props => {
  const { children } = props
  const _node = window.document.createElement('div')
  console.log(children)
  useEffect(() => {
    window.document.body.appendChild(_node)
    return () => {
      window.document.body.removeChild(_node)
    }
  }, [])

  return createPortal(
    <div className="dialog">{children}</div>, //塞进传送门的JSX
    _node //传送门的另一端DOM node
  )
}

const CreatePortal = props => {
  return (
    <div className="hhh">
      555
      <CreatePortalWrap>What ever shit</CreatePortalWrap>
    </div>
  )
}

export default CreatePortal
