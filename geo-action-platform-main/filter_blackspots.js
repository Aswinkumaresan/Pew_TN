
import fs from 'fs';

const content = fs.readFileSync('src/data/gisData.ts', 'utf8');

// Simple regex to extract data
const extractArray = (name) => {
    const startIdx = content.indexOf(`export const ${name} = [`);
    if (startIdx === -1) return [];
    let bracketCount = 0;
    let endIdx = -1;
    for (let i = startIdx + `export const ${name} = [`.length - 1; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        if (content[i] === ']') bracketCount--;
        if (bracketCount === 0) {
            endIdx = i;
            break;
        }
    }
    const arrayStr = content.substring(content.indexOf('[', startIdx), endIdx + 1);
    // Be careful with eval, but this is a controlled environment
    try {
        return eval(arrayStr);
    } catch (e) {
        console.error(`Failed to parse ${name}`);
        return [];
    }
};

const districtBoundaries = extractArray('districtBoundaries');
const blackSpotVillages = extractArray('blackSpotVillages');

function isPointInPolygon(lat, lng, polygon) {
    let x = lat, y = lng;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

const filtered = blackSpotVillages.filter(p => {
    // Check if it's inside ANY district boundary
    for (const d of districtBoundaries) {
        if (isPointInPolygon(p.lat, p.lng, d.boundary)) return true;
    }
    return false;
});

console.log(`Original: ${blackSpotVillages.length}, Filtered: ${filtered.length}`);

// Generate new array string
let newArrayStr = 'export const blackSpotVillages = [\n';
filtered.forEach(p => {
    newArrayStr += `  { name: "${p.name}", lat: ${p.lat}, lng: ${p.lng}, district: "${p.district}", ps: "${p.ps}" },\n`;
});
newArrayStr += '];';

// Replace in content
const startIdx = content.indexOf('export const blackSpotVillages = [');
let bracketCount = 0;
let endIdx = -1;
for (let i = startIdx + 'export const blackSpotVillages = ['.length - 1; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) {
        endIdx = i;
        break;
    }
}

// We need to replace from startIdx to endIdx + 1 (to include the semicolon if there is one)
// Wait, the regex might be cleaner
const newContent = content.substring(0, startIdx) + newArrayStr + content.substring(endIdx + 1);
fs.writeFileSync('src/data/gisData.ts', newContent);
console.log('Successfully filtered and updated blackSpotVillages');
