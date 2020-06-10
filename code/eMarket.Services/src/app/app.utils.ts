export function CopyObject(object:any):any{
    return JSON.parse(JSON.stringify(object))
}