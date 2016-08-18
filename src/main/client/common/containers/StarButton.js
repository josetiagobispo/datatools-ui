import React from 'react'
import { Button } from 'react-bootstrap'
import { updateStar } from '../../manager/actions/user'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'

import { getComponentMessages } from '../util/config'

class StarButton extends React.Component {
  render () {
    const {dispatch, isStarred, user, target, subscriptionType} = this.props
    const messages = getComponentMessages('StarButton')

    return (
      <Button onClick={() => {
        dispatch(updateStar(user.profile, target, !isStarred))
      }}>
        {isStarred
          ? <span><Icon name='star-o'/> {messages.unstar}</span>
          : <span><Icon name='star'/> {messages.star}</span>
        }
      </Button>
    )
  }
}

export default connect()(StarButton)
