# Dropdown Documentation

## General Rules (* => required fields)
1. Dropdowns are triggered by DropClick

## Global Dropdown
- Handled at AppNavigator

## Dropdown Position
- Dropdowns can potentially be rendered outside of the window, this should ideally never happen
- The following cases are considered:

### Initial Dropdown (index === 0)
- Primary axis (Dropdown side attached to div)
    - results in a flip
    - defaults to Y (place: "down")
- Secondary axis
    - results in a shift to threshold const
```javascript
dir: "up" & "down"
    not enough X space
        shift X left
    not enough Y space
        flip Y
dir: "left" & "right"
    not enough Y space
        shift Y downwards
    not enough X space
        flip X
```

### Nested Dropdown (index !== 0, originate from Dropdown)
```javascript

```

## Dropdown Reducer

### Magic equations
```javascript
//these handlers have different magic equations because the events have different values available
if (keysClone.length) {
    ...[code related to DropParent] //e.type: mouseover
} else {
    ...[code related to app-onclick] //e.type: click
}
```

```javascript
{
    pageX: e.pageX - e.nativeEvent.offsetX + e.target.offsetWidth,
    //absolute cursor X position - cursor X offset inside MouseEvent div + width of the div
    //brings us to the right of the div

    pageY: e.pageY - e.nativeEvent.offsetY - DROPDOWN_Y_MARGIN - DROP_TITLE_HEIGHT,
    //absolute cursor Y position - cursor Y offset inside MouseEvent div - some constants
}
```

## Edge Cases

### Dropdown Opened, Clicking outside of Dropdown
- When a Dropdown exists, the whole window is covered by a div with className="drop-down-pause", stopping any other clicks in the application itself. Any click on "drop-down-pause" simply clears dropdownKeys