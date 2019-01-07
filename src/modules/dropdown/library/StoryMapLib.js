import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdown, popDropdown } from '../DropdownReducer'

class StoryMapLib extends React.Component{
    _onMouseEnter = (key, e) => {
        this.props.showDropdown(dropdownType.pageLib, e, {
            hoverKey: key,
            onSelect: this.props.onSelect,
            forcedKey: dropdownType.storyMapLib,
        })
    }

    _onMouseOut = e => {
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdown(dropdownType.pageLib)
        }
    }

    render() {
        const { storyMap, pageRepo, hoverKey } = this.props
        
        let stories = _.filter(pageRepo, i => hoverKey === i.boardType)
        stories = _.groupBy(stories, i => i.storyType)
        
        return (
            Object.keys(stories).map((item, index) => {
                return (
                    <div
                        key={item}
                        className="drop-down-menu-option"
                        onMouseOver={this._onMouseEnter.bind(this, item)}
                        onMouseOut={this._onMouseOut}
                    >
                        {storyMap[item].title}
                        <i
                            className="ion-ios-play"
                            style={{
                                marginLeft: 'auto',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdown,
        popDropdown,
    }
)(StoryMapLib)