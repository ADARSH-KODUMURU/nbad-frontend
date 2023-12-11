import React from 'react'
import ConfigExpanses from './ConfigExpanses'

describe('<ConfigExpanses />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConfigExpanses />)
  })
})