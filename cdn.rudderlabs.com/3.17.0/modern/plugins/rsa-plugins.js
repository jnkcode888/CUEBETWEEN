const e = {},
    t = new Set(["Module", "__esModule", "default", "_export_sfc"]);
let n = {
    "./BeaconQueue": () => a("./rsa-plugins-remote-BeaconQueue.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./CustomConsentManager": () => a("./rsa-plugins-remote-CustomConsentManager.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./DeviceModeDestinations": () => a("./rsa-plugins-remote-DeviceModeDestinations.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./DeviceModeTransformation": () => a("./rsa-plugins-remote-DeviceModeTransformation.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./ExternalAnonymousId": () => a("./rsa-plugins-remote-ExternalAnonymousId.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./GoogleLinker": () => a("./rsa-plugins-remote-GoogleLinker.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./IubendaConsentManager": () => a("./rsa-plugins-remote-IubendaConsentManager.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./KetchConsentManager": () => a("./rsa-plugins-remote-KetchConsentManager.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./NativeDestinationQueue": () => a("./rsa-plugins-remote-NativeDestinationQueue.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./OneTrustConsentManager": () => a("./rsa-plugins-remote-OneTrustConsentManager.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./StorageEncryption": () => a("./rsa-plugins-remote-StorageEncryption.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./StorageEncryptionLegacy": () => a("./rsa-plugins-remote-StorageEncryptionLegacy.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./StorageMigrator": () => a("./rsa-plugins-remote-StorageMigrator.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e)),
    "./XhrQueue": () => a("./rsa-plugins-remote-XhrQueue.min.js").then((e => Object.keys(e).every((e => t.has(e))) ? () => e.default : () => e))
};
async function a(t) {
    return e[t] || (e[t] =
        import (t)), e[t]
}
const o = e => {
        if (!n[e]) throw new Error("Can not find remote module " + e);
        return n[e]()
    },
    r = e => {
        globalThis.__federation_shared__ = globalThis.__federation_shared__ || {}, Object.entries(e).forEach((([e, t]) => {
            for (const [n, a] of Object.entries(t)) {
                const t = a.scope || "default";
                globalThis.__federation_shared__[t] = globalThis.__federation_shared__[t] || {};
                const o = globalThis.__federation_shared__[t];
                (o[e] = o[e] || {})[n] = a
            }
        }))
    };
export {
    o as get, r as init
};
//# sourceMappingURL=rsa-plugins.js.map