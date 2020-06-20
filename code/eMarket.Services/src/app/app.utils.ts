export function CopyObject(object:any):any{
    return JSON.parse(JSON.stringify(object))
}

export function RandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

