import React from 'react'
import ExpanseConfig from './ExpanseConfig'

describe('<ExpanseConfig />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ExpanseConfig />)
  })
})