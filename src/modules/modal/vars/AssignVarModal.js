import React, { useState } from 'react'
import './AssignVarModal.css'
import _ from 'lodash'

import { basicOpType, DEFAULT_ASSIGN } from './components/ops'

import ModalOptions from '../components/ModalOptions'
import ActiveOp from './components/ActiveOp'
import PlaygroundDroppable from './components/PlaygroundDroppable';
import BasicOpDraggable from './components/BasicOpDraggable';
import VarValueDraggable from './components/VarValueDraggable'

export default function AssignVarModal(props) {
    let [playground, setPlayground] = useState([])
    const { attachVar, attach } = props

    const variableInfo = attach || { variableTypes: [], assign: DEFAULT_ASSIGN }
    const { variableTypes, assign } = variableInfo

    const assignable = _(attachVar)
        .filter(i => i.isNotDefault)
        .value()

    let [error, setError] = useState('')

    let handleSave = () => {
        props.onSave(props.attach)
        props.popModalBy(1)
    }
    
    return (
        <div
            cancel-appclick="true"
            style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 600,
                width: '45vw',
            }}
        >
            <div className="row">
                <div className="dashboard-section-title">VARIABLE</div>
                <div className="assign-var-tag">{attach.key}</div>
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">TYPES</div>
                {variableTypes.map(item => (
                    <div
                        key={item}
                        className="assign-var-tag"
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">SET VARIABLE TO</div>
                <ActiveOp opInfo={assign} subpath={[]} setError={setError}/>
            </div>
            <div className="-sep-no-m"></div>
            <PlaygroundDroppable playground={playground} setPlayground={setPlayground}>
                <div className="dashboard-section-title">playground</div>
                <div className="row">
                    {playground.map((item, index) => <ActiveOp key={index} opInfo={item} subpath={[]} setError={setError}/>)}
                </div>
            </PlaygroundDroppable>
            <div className="-sep-no-m"></div>
            <div className="dashboard-section-title">BASIC OPERATIONS</div>
            <div className="row">
                {_.toArray(basicOpType).map(item => <BasicOpDraggable key={item.key} item={item}/>)}
            </div>
            <div className="-sep-no-m"></div>
            <div className="row">
                <div className="dashboard-section-title">VARIABLES</div>
                {assignable.map(item => <VarValueDraggable key={item.key} item={item}/>)}
            </div>
            <ModalOptions
                errorMessage={error}
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}