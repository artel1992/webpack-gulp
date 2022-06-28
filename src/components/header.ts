export const showDropMenu = (event: MouseEvent, elementId: string = 'header-dropmenu') => {
    let el = document.getElementById(elementId)
    el.hidden = !el.hidden
    let targetPosition = (event.target as Element).getBoundingClientRect()
    let elPosition = el.getBoundingClientRect()
    el.style.top = `${targetPosition.bottom + 5}px`
    el.style.left = `${(targetPosition.left + targetPosition.width / 2) - elPosition.width / 2}px`
}
