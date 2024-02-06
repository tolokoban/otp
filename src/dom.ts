export function get(id: string): HTMLElement {
    const elem = document.getElementById(id)
    if (!elem) throw Error(`Missing element with id #${id}!`)

    return elem
}

const SPLASH_SCREEN_VANISHING_TIME_MS = 600

export function removeSplash() {
    const splash = get("splash-screen")
    splash.classList.add("vanish")
    window.setTimeout(
        () => document.body.removeChild(splash),
        SPLASH_SCREEN_VANISHING_TIME_MS
    )
}
