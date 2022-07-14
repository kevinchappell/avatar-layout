import { useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { useInterval, useMeasure } from 'react-use'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { animationSpeed, avatarSize, createUser, generatePositionMap } from './utils'
import './App.css'

export default function App() {
  const [users, setUsers] = useState([createUser()])
  const [ref, { width, height }] = useMeasure()
  const positionMap = useMemo(() => generatePositionMap(width, height), [width, height])

  useInterval(() => {
    if (users.length < positionMap.length) {
      setUsers([...users, createUser()])
    }
  }, animationSpeed)

  return (
    <div className="App">
      <div className="mockMap" ref={ref}>
        <TransitionGroup className="todo-list">
          {users.map((user, index) => (
            <CSSTransition key={`user-${index}`} timeout={animationSpeed} classNames="avatar">
              <span className="avatarWrap" style={{ left: positionMap[index]?.x, top: positionMap[index]?.y }}>
                <Avatar
                  {...user}
                  sx={{
                    width: avatarSize,
                    height: avatarSize,
                  }}
                />
              </span>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}
