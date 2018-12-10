import React from 'react'
import { fieldIcon } from '../../fields/defaults'

class InputField extends React.Component{
    _onChange = e => {
        const { pageInfo, field } = this.props
        const { pageKey } = pageInfo

        this.props.updatePage(pageKey, field, e.target.value)
    }

    render() {
        const { fieldTitle } = this.props
        
        return (
            <div className="field-item template-title" style={{ marginBottom: 4 }}>
            {fieldTitle}
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.text}`} style={{ width: 16 }}></i>
                    Text Field
                </div>
            </div>
        )
    }
}

export default InputField