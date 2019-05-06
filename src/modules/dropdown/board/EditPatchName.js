import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
    useAutofocus,
} from '../../hooks/Hooks'
import { updateGeneral } from '../../page/PageReducer'

import {
    DropSubmit,
} from '../components/Common'

//PatchHeader, PhaseFlowHeader
export default connect(
    null,
    {
        updateGeneral,
    }
)(function EditPatchName(props) {
    const { attach, path } = props

    const focusRef = useAutofocus()

    const [value, setValue] = useState(attach.title || "")
    const handleChange = e => setValue(e.target.value)

    const onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                onSubmit()
                break
            default:
        }
    }

    const onSubmit = () => {
        props.updateGeneral(path, {title: value})
        props.showDropdown()
    }

    return (
        <div className="row">
            <input
                ref={focusRef}
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                placeholder="name of patch ..."
                type='text'
            />
            <DropSubmit
                onClick={onSubmit}
                icon="mdi mdi-checkbox-marked-outline"
            >
                save
            </DropSubmit>
        </div>
    )
})