import React from 'react'
import { fieldIcon } from '../defaults'
import _ from 'lodash'

import { dropdownType } from '../../app/menu/types'
import LogicBlock from '../../fields/logic/LogicBlock'
import { defaultLogic } from '../logic/types';

class LogicBoard extends React.Component{
    _renderRow = (item, index) => {
        return (
            <div key={index} className="row" style={{marginBottom: 8}}>
                {this._renderTrigger(item.mode, index)}
                <i className="ion-ios-fastforward" style={{ color: '#a6a6a6', width: 20 }}></i>
                {this._renderPhase(item.to, index)}
            </div>
        )
    }

    _renderPhase = (to, index) => {
        const { pageInfo, value, pageRepo } = this.props
        const pageKey = value[index].to
        
        return (
            <div
                key={to}
                field-key="phaseTriggerMode"
                page-key={pageInfo.pageKey}
                subfield-key="to"
                index-key={index}
                className="property-button menu-onclick"
                menu-type={dropdownType.showAllPhases}
            >
                {(pageKey && pageRepo[pageKey].title) || 'None'}
            </div>
        )
    }

    render() {
        const { fieldInfo, field, value } = this.props
        
        let parents, index
        let children = {}
        for (var logicKey in value) {
            if (value[logicKey].right) children[value[logicKey].right] = true
            if (value[logicKey].down) children[value[logicKey].down] = true
        }
        parents = _.pickBy(value, (i, key) => !children[key])
        index = Object.keys(parents)[0]

        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.phaseTrigger}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <LogicBlock {...this.props} value={value || defaultLogic} index={index}/>
            </div>
        )
    }
}

export default LogicBoard