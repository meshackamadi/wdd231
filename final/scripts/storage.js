export function savePreference(key, value) {
    localStorage.setItem(`sharespoon_${key}`, JSON.stringify(value));
}
export function getPreference(key) {
    const item = localStorage.getItem(`sharespoon_${key}`);
    return item ? JSON.parse(item) : null;
}
export function loadStats() { /* optional */ }