function setLocalStorage(key: string, value: any): void {
    console.log(`[set localStorage] key: ${key} value: ${value}`)
    localStorage.setItem(key, JSON.stringify(value))
    console.log(123456789,key, JSON.stringify(value));
}

function getLocalStorage(key: string): any {
    const value = JSON.parse(<string>localStorage.getItem(key))
    // console.log(`[get localStorage] key: ${key} value: ${value}`)
    return value
}

function removeLocalStorage(key: string): void {
    console.log(`[remove localStorage] key: ${key}`)
    localStorage.removeItem(key)
}

function clearLocalStorage(): void {
    console.log(`[clear localStorage]`)
    localStorage.clear()
}
export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage
}