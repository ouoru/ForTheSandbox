import React from 'react'
import './storm.css'

import PhaseFlowHeader from './components/PhaseFlowHeader';
import PhaseFlowDiagram from './components/PhaseFlowDiagram';
import PhaseDiagram from './components/PhaseDiagram';

export default function PhaseFlowView(props) {
    const { match } = props
    const { params } = match
    const { modeKey } = params

    return (
        <>
            <PhaseFlowHeader {...props} modeKey={modeKey}/>
            {/*<PhaseFlowDiagram {...props} modeKey={modeKey}/>*/}
            <PhaseDiagram modeKey={modeKey}/>
        </>
    )
}