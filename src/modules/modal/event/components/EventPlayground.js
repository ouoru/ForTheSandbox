import React from 'react'

import EventRecipients from './EventRecipients'
import EventTextInput from './EventTextInput';
import EventStringDragDrop from './EventStringDragDrop';

export default function EventPlayground(props) {
    const { selectedItem } = props
    const { string } = selectedItem

    return (
        <div className="event-playground" cancel-appclick="true">
            <div className="dashboard-section-title">Recipients</div>
            <EventRecipients {...props}/>
            <div className="-sep"/>
            <div className="dashboard-section-title">Event Text</div>
            <div className="event-playground-view">
                {string.map((item, index) => (
                    <EventStringDragDrop
                        {...props}
                        key={index}
                        item={item}
                        index={index}
                    />
                ))}
            </div>
            <EventTextInput {...props}/>
        </div>
    )
}