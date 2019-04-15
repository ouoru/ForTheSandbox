import React from 'react'
import  _ from 'lodash'
import { connect } from 'react-redux'

import {
    variableType,
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types';

import {
    DropTitle,
    DropItem,
} from '../components/Common'

const ROLE_TEAM_KEY = 'roleTeam'

export default connect(
    state => ({
        fieldRepo: state.page.fieldRepo,
    })
)(function PickRoleTeam(props) {
    const { fieldRepo } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            display: item.title,
            variableTypes: [
                variableType.string.key,
            ],
            updateType: updateType.string,
        })
        props.showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item)}
            >
                {item.title}
            </DropItem>
        )
    }
    
    const data = _.sortBy(fieldRepo[ROLE_TEAM_KEY].data, i => i.index)
    return (
        <>
            <DropTitle>teams</DropTitle>
            {data.map(renderItem)}
        </>
    )
})