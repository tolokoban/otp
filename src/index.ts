import { decode } from "./decoder"
import { get, removeSplash } from "./dom"

import "./index.module.css"

removeSplash()
get("btnDecode").addEventListener("click", () => {
    const code = (get("txtInput") as HTMLInputElement).value
    decode(code)
        .then(() => console.log("OK!"))
        .catch(console.error)
})
