import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'

const itemSource = {
    beginDrag(props) {
        return {}
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
  
function EventBarItemDrag(props) {
    const { item, onClick, connectDragSource } = props
    
    let char = '*'
    if (item.string[0]) {
        char = item.string[0].string && item.string[0].string.charAt(0)
    }

    return connectDragSource(
        <div
            className="dashboard-item"
            onClick={() => onClick(item)}
        >
            {char}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_STRING,
    itemSource,
    collect
)(EventBarItemDrag);