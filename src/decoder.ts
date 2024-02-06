import Protobuf from "protobufjs"
import { base32 } from "multiformats/bases/base32"

export async function decode(code: string) {
    const cypher = decodeURIComponent(
        code.substring("otpauth-migration://offline?data=".length)
    )
    const root = await load("otp.proto")
    console.log("🚀 [decoder] root = ", root) // @FIXME: Remove this line written on 2024-02-06 at 18:06
    const type = root.lookupType("MigrationPayload")
    console.log("🚀 [decoder] cypher = ", cypher) // @FIXME: Remove this line written on 2024-02-06 at 17:31
    const resp = await fetch(`data:application/octet-stream;base64,${cypher}`)
    const buffer = await resp.arrayBuffer()
    const message = type.decode(new Uint8Array(buffer)) as unknown as Message
    console.log("🚀 [decoder] message = ", message) // @FIXME: Remove this line written on 2024-02-06 at 17:27
    const { secret } = message.otpParameters[0]
    console.log("🚀 [decoder] secret = ", secret) // @FIXME: Remove this line written on 2024-02-06 at 18:10
    const secretB32 = base32.encode(secret)
    console.log("🚀 [decoder] secret (Base32) = ", secretB32) // @FIXME: Remove this line written on 2024-02-06 at 18:05
}

interface Message {
    otpParameters: Array<{
        secret: Uint8Array
    }>
}

async function load(url: string): Promise<Protobuf.Root> {
    return new Promise((resolve, reject) => {
        Protobuf.load(url, (err, root) => {
            if (err) reject(err)
            else if (!root) reject("Fatal error!")
            else resolve(root)
        })
    })
}
