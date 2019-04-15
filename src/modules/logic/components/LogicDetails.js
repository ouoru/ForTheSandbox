import React from 'react'

import { logicType } from '../types'

import LogicVarWrapper from '../vars/LogicVarWrapper'
import LogicUpdateItem from '../details/LogicUpdateItem';
import LogicMutateItem from '../details/LogicMutateItem';

export default function LogicDetails(props) {
    const { value, path } = props
    const { data, declare } = value

    return (
        <div className="column">
            {declare && Object.keys(declare).map(variable => (
                <LogicVarWrapper
                    {...props}
                    key={variable}
                    item={declare[variable]}
                    path={[...path, 'declare']}
                />
            ))}
            {value.logicType === logicType.variable.key && 
                Object.keys(data).map(field => (
                    <LogicMutateItem
                        {...props}
                        key={field}
                        prefix={field}
                        data={data[field]}
                        path={[...path, 'data']}
                    />
                ))
            }
            {value.logicType === logicType.update.key &&
                Object.keys(data).map(field => (
                    <LogicUpdateItem
                        {...props}
                        key={field}
                        prefix={field}
                        data={data[field]}
                        path={[...path, 'data']}
                    />
                ))
            }
        </div>
    )
}