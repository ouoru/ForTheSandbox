import React from 'react'

class TextField extends React.Component{
    _onChange = e => {
        const { pageKey, fieldKey } = this.props
        this.props.updatePageByPath(pageKey, fieldKey, e.target.value)
    }

    render() {
        const { value, inputType } = this.props

        return (
            <textarea
                className="field-text-input"
                value={value || ''}
                onChange={this._onChange}
                placeholder="Start typing ..."
                type={inputType}
            />
        )
    }
}

export default TextField