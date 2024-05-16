export function trimUrl(url: string) {
    return url.substring(0, url.indexOf('.com') + 4);
}