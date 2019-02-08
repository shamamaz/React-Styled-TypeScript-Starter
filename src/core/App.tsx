import React from 'react'
import { connect } from 'react-redux'
import { fetchFeeds } from '../common/api/actions'
import styled from 'styled-components'
import { Nav } from '../common/components'
import { Main } from '../core/components'

const Rectangle = styled.div`
  height: 30px;
  width: 100%;
  background-color: rgb(120, 100, 123);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat';
  font-size: 30px;
  color: white;
  padding: 16px;
`
const MainPage = styled.div`
  display: flex;
  position: relative;
`

const mapStatetoProps = state => {
  return {
    result: state.simpleReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFeeds: (params: { sortBy: string }) => dispatch(fetchFeeds(params)),
  }
}

interface AppProps {
  fetchFeeds: (params: { sortBy: string }) => Promise<string>
  result: any
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props)
    this.props.fetchFeeds({ sortBy: 'id' })
  }

  render() {
    return (
      <div className="App">
        <Rectangle>React, TS, the whole shebang</Rectangle>
        <MainPage>
          <Nav />
          <Main />
        </MainPage>
      </div>
    )
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App)
