import React from 'react'
import { shallow } from 'enzyme'

import Nav from '.'

test('snapshot', () => {
  const result = shallow(<Nav />)

  expect(result).toMatchSnapshot()
})
