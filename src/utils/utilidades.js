export function toPojo (objeto) {
    return JSON.parse(JSON.stringify(objeto))
}