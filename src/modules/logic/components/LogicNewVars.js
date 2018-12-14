import React from 'react'

class LogicNewVars extends React.Component{
    render() {
        const { newVars } = this.props
        if (!newVars) return null

        return (
            <div
                className="row"
                style={{
                    width: 110,
                }}
            >
                {Object.keys(newVars).map((item, index) => (
                    <div
                        key={index}
                        className="logic-new-var"
                        style={{
                            marginTop: 2,
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        )
    }
}

export default LogicNewVars