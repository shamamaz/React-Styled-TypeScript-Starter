import React from 'react'
import { shallow } from 'enzyme'

import Card from '.'

test('snapshot', () => {
  const result = shallow(<Card />)

  expect(result).toMatchSnapshot()
})
