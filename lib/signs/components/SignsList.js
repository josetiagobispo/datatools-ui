import Icon from '@conveyal/woonerf/components/icon'
import React, { Component, PropTypes } from 'react'
import { Row, ButtonGroup, Button, FormControl, FormGroup, Badge } from 'react-bootstrap'

import SignPreview from './SignPreview'
import { FILTERS } from '../util'
import toSentenceCase from '../../common/util/to-sentence-case'

export default class SignsList extends Component {
  static propTypes = {
    signs: PropTypes.array,
    visibilityFilter: PropTypes.object,
    isFetching: PropTypes.bool,
    editableFeeds: PropTypes.array,
    publishableFeeds: PropTypes.array,

    onEditClick: PropTypes.func,
    onZoomClick: PropTypes.func,
    onDeleteClick: PropTypes.func,

    searchTextChanged: PropTypes.func,
    visibilityFilterChanged: PropTypes.func
  }
  render () {
    const sortedSigns = this.props.signs.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })

    return (
      <div>
        <Row>
          <FormGroup>
            <FormControl
              type='text'
              placeholder='Search Signs'
              onChange={evt => this.props.searchTextChanged(evt.target.value)}
              defaultValue={this.props.visibilityFilter.searchText}
            />
          </FormGroup>
        </Row>
        <Row>
          <ButtonGroup justified>
            {FILTERS.map(f => (
              <Button
                active={this.props.visibilityFilter.filter === f}
                onClick={() => this.props.visibilityFilterChanged(f)}
                href='#'
                key={f}
              >
                {toSentenceCase(f)} <Badge style={{backgroundColor: '#babec0'}}>{this.props.filterCounts[f]}</Badge>
              </Button>
            ))}
          </ButtonGroup>
          <div className='form-group'>&nbsp;</div>
        </Row>
        <Row>
          {this.props.isFetching
            ? <p className='text-center'><Icon className='fa-5x fa-spin' type='refresh' /></p>
            : sortedSigns.length
            ? sortedSigns.map((sign) => {
              return <SignPreview
                sign={sign}
                key={sign.id}
                editableFeeds={this.props.editableFeeds}
                publishableFeeds={this.props.publishableFeeds}
                onEditClick={this.props.onEditClick}
                onZoomClick={this.props.onZoomClick}
                onDeleteClick={this.props.onDeleteClick}
              />
            })
            : <p className='lead text-center'>No signs found.</p>
          }
        </Row>
      </div>
    )
  }
}
