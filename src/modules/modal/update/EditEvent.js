import React, { useState } from 'react'
import './EditEvent.css'

import { updateViewType } from '../../logic/types'
import { WS_EDIT_EVENT } from '../workspaces'
import { StatefulSourceId } from '../../dropdown/types'

import EventDashboard from '../components/event/EventDashboard';
import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import DropdownView from '../../dropdown/DropdownView'

export default function EditEvent(props) {
    let [workspace, setWorkspace] = useState(Object.assign(WS_EDIT_EVENT, props.attach))
    
    let handleSave = () => {
        props.updatePage(
            props.path,
            {
                ...workspace,
                updateViewType: updateViewType.events,
            },
            props.subpath,
        )
        props.popModalBy(1)
    }
    
    return (
        <ModalCheckSave
            {...props}
            past={props.attach}
            current={workspace}
            handleSave={handleSave}
        >
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '75vw',
                }}
            >
                <EventDashboard
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                />
                <DropdownView
                    sourceId={StatefulSourceId.editEvent}
                    state={workspace}
                    updateState={setWorkspace}
                />
                <ModalOptions
                    onSave={handleSave}
                    onClose={props.close}
                />
            </div>
        </ModalCheckSave>
    )
}