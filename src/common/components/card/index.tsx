import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
  width: 15%;
  min-width: 60px;
  background-color: rgb(120, 100, 123);
  justify-content: left;
`

const Card = () => {
  function loading() {
    return (
      <ul>
        <li>Loading card content...</li>
      </ul>
    )
  }

  return <Style>{loading()}</Style>
}

export default Card
