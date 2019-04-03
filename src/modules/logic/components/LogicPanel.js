import React from 'react'
import { connect } from 'react-redux'

import { dataPropToTitle } from '../LogicReducer'

function LogicPanel(props) {
    const {
        pageKey, fieldKey, indexKey, subfieldKey,
        value, //logic item
        vars,
        title,
        placeholder,
        dropdown,
        path,
    } = props

    //get data of the logic item
    const data = value.data || {}
    //get data of the logic panel
    const dataProp = (subfieldKey ? data[subfieldKey] : data) || {}

    return (
        <div
            className="logic-button app-onclick"
            menu-type={dropdown}
            app-onclick-props={JSON.stringify({
                pageKey,
                fieldKey,
                indexKey,
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                attachVar: vars,
                path: subfieldKey ? [...path, subfieldKey] : path,
                ignoreSubpath: true,
            })}
            style={{
                color: (dataProp.key || dataProp.value || dataProp.adjust) ? '#fff' : '#868686',
            }}
        >
            <div className="text-ellipsis">
                {dataProp.code || props.dataPropToTitle(dataProp) || title || placeholder}
            </div> 
        </div>
    )
}

export default connect(
    null,
    {
        dataPropToTitle,
    }
)(LogicPanel)