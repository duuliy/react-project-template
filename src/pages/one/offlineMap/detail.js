import { useState, useEffect } from 'react'
import { hasAuth } from '@u/common'
import ACCSS from '@a/js/access'

export default () => {
  const [str, setStr] = useState('详情')
  useEffect(() => {
    setStr('duuliy的详情')
  }, [])
  return (
    <div style={{ textAlign: 'center' }}>
      {str}
      {hasAuth(ACCSS.one) && <div>有权限</div>}
      {hasAuth('666') && <div>无权限</div>}
    </div>
  )
}
