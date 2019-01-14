import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../ModalReducer'
import { getUpdateCode } from '../../logic/LogicReducer'

import { triggerNewVars } from '../../logic/types'

import LogicArgs from '../../logic/components/LogicArgs'
import LogicObject from '../../logic/form/LogicObject';
import CodeField from '../../fields/components/CodeField';

var beautify_js = require('js-beautify');

class EditTrigger extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        const { pageKey, fieldKey, indexKey, subfieldKey, attach, attachVar } = this.props
        
        const data = attach && attach.value
        const iprops = {
            indexKey,
            logicInfo: {
                data,
            },
            pageKey,
            fieldKey,
            subfieldKey,
            vars: {
                ...attachVar,
                ...triggerNewVars,
            },
        }
        
        const code = beautify_js(getUpdateCode(data), {brace_style: 'end-expand'})
        
        return (
            <div cancel-appclick="true">
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        Edit Trigger
                    </div>
                    <div className="row">
                        <div style={{ marginRight: 16 }}>
                            <LogicArgs vars={triggerNewVars}/>
                            <LogicObject {...iprops}/>
                        </div>
                        <CodeField code={code}/>
                    </div>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" onClick={this.props.onClose}>
                        {`Cancel`}
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        {`Done`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showModal,
    }
)(EditTrigger)