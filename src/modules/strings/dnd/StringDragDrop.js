import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { DRAGGABLE_TYPE } from '../types'
import { COLLECT_DRAG } from '../../modal/ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            dragIndex: props.index,
        }
    }
}

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        const itemType = monitor.getItemType()

        const { eventIndex, workspace, index } = props
        let wsClone = Object.assign({}, workspace)
        let wsString = wsClone.eventArr[eventIndex].stringArr

        switch(itemType) {
            case DRAGGABLE_TYPE.color:
                wsString[index].color = item.hexcode
                props.setWorkspace(wsClone)
                break
            case DRAGGABLE_TYPE.string:
                console.log("thats a string!")
                break
            default:
        }
    },
    canDrop(props, monitor) {
        const item = monitor.getItem()
        if (item.dragIndex === props.index) return false
        return true
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}
  
function StringDragDrop(props) {
    const { item, index, stringIndex, workspace, setWorkspace, setText,
        connectDragSource, connectDropTarget, canDrop, isOver } = props
    const { string, color } = item

    let handleSelect = () => {
        setWorkspace({
            ...workspace,
            stringIndex: index,
            selectedColor: color,
        })
        setText(string)
        document.getElementById('event-editor-textarea').focus()
    }

    const selected = index === stringIndex

    return connectDragSource(connectDropTarget(
        <div
            className="event-playground-item"
            onClick={handleSelect}
            style={{
                color: color || '#d6d6d6',
                backgroundColor: selected ? 'rgba(14, 125, 180, 0.4)' : (canDrop && isOver && 'rgba(70, 73, 78, 1)'),
                pointerEvents: 'all',
            }}
        >
            {string}
        </div>
    ));
}

export default DragSource(
    DRAGGABLE_TYPE.string,
    itemSource,
    COLLECT_DRAG,
)(DropTarget(
    [DRAGGABLE_TYPE.string, DRAGGABLE_TYPE.variable],
    itemTarget,
    collectDrop,
)(StringDragDrop));

