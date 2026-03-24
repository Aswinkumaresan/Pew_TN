
import fs from 'fs';

const content = fs.readFileSync('src/data/gisData.ts', 'utf8');

// Extraction function using simple string matching and bracket counting
const extractRawContent = (name) => {
    const startIdx = content.indexOf(`export const ${name}`);
    if (startIdx === -1) return null;
    let bracketCount = 0;
    let foundStart = false;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '[') {
            bracketCount++;
            if (!foundStart) foundStart = true;
        }
        if (content[i] === ']') {
            bracketCount--;
        }
        if (foundStart && bracketCount === 0) {
            endIdx = i;
            break;
        }
    }
    return content.substring(content.indexOf('[', startIdx), endIdx + 1);
};

// Robust point-in-polygon logic
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

const boundariesRaw = extractRawContent('districtBoundaries')
    .replace(/: \{ name: string; boundary: \[number, number\]\[\] \}\[\]/g, '')
    .split(' as [number, number]').join('');
// Convert array string to JS object
const districtBoundaries = eval(boundariesRaw);

const originalBlackspots = [
  { name: "ACHAMANGALAM",    lat: 12.518051, lng: 78.322256, district: "Krishnagiri", ps: "KANDHIKUPPAM" },
  { name: "EKALANATTAM",     lat: 12.682680, lng: 78.263988, district: "Krishnagiri", ps: "MAHARAJAKADAI" },
  { name: "JOWLAGIRI",       lat: 12.535304, lng: 77.638430, district: "Krishnagiri", ps: "THALLY" },
  { name: "KADIRAMPATTI",    lat: 12.196252, lng: 78.403877, district: "Krishnagiri", ps: "KALLAVI" },
  { name: "KALINGAVARAM",    lat: 12.697526, lng: 78.081850, district: "Krishnagiri", ps: "GURUBARAPALLI" },
  { name: "KALLAVI",         lat: 12.233665, lng: 78.450063, district: "Krishnagiri", ps: "KALLAVI" },
  { name: "KEMPAGARAI R.F.", lat: 12.289040, lng: 77.828294, district: "Krishnagiri", ps: "ANCHETTY" },
  { name: "KOTHAPALLI",      lat: 12.830072, lng: 77.832509, district: "Krishnagiri", ps: "BAGALUR" },
  { name: "PULIYANUR",       lat: 12.269901, lng: 78.634508, district: "Krishnagiri", ps: "SINGARAPETTI" },
  { name: "REDDIVALASAI",    lat: 12.294637, lng: 78.604034, district: "Krishnagiri", ps: "SINGARAPETTI" },
  { name: "THALIPALLI",      lat: 12.684451, lng: 78.200131, district: "Krishnagiri", ps: "MAHARAJAKADAI" },
  { name: "VEERAMALAI",      lat: 12.349898, lng: 78.325608, district: "Krishnagiri", ps: "NAGARASAMAPATTI" },
  { name: "Thalaivasal",    lat: 11.706, lng: 78.558, district: "Salem", ps: "Thalaivasal" },
  { name: "Gangavalli",     lat: 11.484, lng: 78.581, district: "Salem", ps: "Gangavalli" },
  { name: "Mettur",         lat: 11.788, lng: 77.808, district: "Salem", ps: "Mettur" },
  { name: "Vazhapadi",      lat: 11.551, lng: 78.489, district: "Salem", ps: "Vazhapadi" },
  { name: "Kadayampatti",   lat: 11.763, lng: 78.012, district: "Salem", ps: "Kadayampatti" },
  { name: "Yercaud Ghat",   lat: 11.767, lng: 78.212, district: "Salem", ps: "Yercaud" },
  { name: "Madukkarai",     lat: 10.892, lng: 76.967, district: "Coimbatore", ps: "Madukkarai" },
  { name: "Karamadai",      lat: 11.238, lng: 76.962, district: "Coimbatore", ps: "Karamadai" },
  { name: "Pollachi",       lat: 10.659, lng: 77.011, district: "Coimbatore", ps: "Pollachi" },
  { name: "Anaimalai",      lat: 10.578, lng: 76.949, district: "Coimbatore", ps: "Anaimalai" },
  { name: "Sulur",          lat: 11.025, lng: 77.135, district: "Coimbatore", ps: "Sulur" },
  { name: "Gudiyatham",     lat: 12.942, lng: 78.887, district: "Vellore", ps: "Gudiyatham" },
  { name: "Ambur",          lat: 12.791, lng: 78.720, district: "Vellore", ps: "Ambur" },
  { name: "Katpadi",        lat: 12.972, lng: 79.155, district: "Vellore", ps: "Katpadi" },
  { name: "Palayamkottai",  lat:  8.720, lng: 77.733, district: "Tirunelveli", ps: "Palayamkottai" },
  { name: "Nanguneri",      lat:  8.493, lng: 77.651, district: "Tirunelveli", ps: "Nanguneri" },
  { name: "De District",   lat:  8.861, lng: 77.550, district: "Tirunelveli", ps: "Cheranmahadevi" },
  { name: "Sholavandan",    lat:  9.984, lng: 78.002, district: "Madurai", ps: "Sholavandan" },
  { name: "Usilampatti",    lat:  9.969, lng: 77.797, district: "Madurai", ps: "Usilampatti" },
  { name: "Melur",          lat: 10.030, lng: 78.340, district: "Madurai", ps: "Melur" },
  { name: "Thirumangalam",  lat:  9.831, lng: 77.986, district: "Madurai", ps: "Thirumangalam" },
  { name: "Palani",         lat: 10.448, lng: 77.522, district: "Dindigul", ps: "Palani" },
  { name: "Oddanchatram",   lat: 10.290, lng: 77.726, district: "Dindigul", ps: "Oddanchatram" },
  { name: "Vadamadurai",    lat: 10.414, lng: 78.049, district: "Dindigul", ps: "Vadamadurai" },
  { name: "Kangeyam",       lat: 10.972, lng: 77.559, district: "Tiruppur", ps: "Kangeyam" },
  { name: "Udumalaipettai", lat: 10.586, lng: 77.247, district: "Tiruppur", ps: "Udumalaipettai" },
  { name: "Dharapuram",     lat: 10.741, lng: 77.508, district: "Tiruppur", ps: "Dharapuram" },
  { name: "Bhavani",        lat: 11.448, lng: 77.686, district: "Erode", ps: "Bhavani" },
  { name: "Sathyamangalam", lat: 11.504, lng: 77.238, district: "Erode", ps: "Sathyamangalam" },
  { name: "Perundurai",     lat: 11.274, lng: 77.583, district: "Erode", ps: "Perundurai" },
  { name: "Gingee",         lat: 12.254, lng: 79.417, district: "Viluppuram", ps: "Gingee" },
  { name: "Tindivanam",     lat: 12.233, lng: 79.654, district: "Viluppuram", ps: "Tindivanam" },
  { name: "Sankarapuram",   lat: 11.952, lng: 79.049, district: "Viluppuram", ps: "Sankarapuram" },
  { name: "Kumbakonam",     lat: 10.961, lng: 79.388, district: "Thanjavur", ps: "Kumbakonam" },
  { name: "Papanasam",      lat: 10.936, lng: 79.262, district: "Thanjavur", ps: "Papanasam" },
  { name: "Pattukkottai",   lat: 10.429, lng: 79.319, district: "Thanjavur", ps: "Pattukkottai" },
  { name: "Srirangam",      lat: 10.861, lng: 78.692, district: "Tiruchirappalli", ps: "Srirangam" },
  { name: "Lalgudi",        lat: 10.864, lng: 78.824, district: "Tiruchirappalli", ps: "Lalgudi" },
  { name: "Musiri",         lat: 10.961, lng: 78.448, district: "Tiruchirappalli", ps: "Musiri" },
  { name: "Nagercoil",      lat:  8.178, lng: 77.432, district: "Kanyakumari", ps: "Nagercoil" },
  { name: "Marthandam",     lat:  8.311, lng: 77.231, district: "Kanyakumari", ps: "Marthandam" },
  { name: "Colachel",       lat:  8.174, lng: 77.265, district: "Kanyakumari", ps: "Colachel" },
  { name: "Tiruchengode",   lat: 11.380, lng: 77.895, district: "Namakkal", ps: "Tiruchengode" },
  { name: "Rasipuram",      lat: 11.468, lng: 78.183, district: "Namakkal", ps: "Rasipuram" },
  { name: "Pennagaram",     lat: 12.137, lng: 77.877, district: "Dharmapuri", ps: "Pennagaram" },
  { name: "Palachode",      lat: 12.285, lng: 77.756, district: "Dharmapuri", ps: "Palachode" },
  { name: "Pappireddipatti",lat: 11.941, lng: 78.354, district: "Dharmapuri", ps: "Pappireddi" },
];

const generatedTxt = fs.readFileSync('generated_gis_points.txt', 'utf8');
const lines = generatedTxt.split('\n');

const extractFromTxt = (header) => {
    const list = [];
    let start = false;
    for (const line of lines) {
        if (line.includes(header)) {
            start = true;
            continue;
        }
        if (start && line.trim().startsWith('{')) {
             list.push(eval('(' + line.trim().replace(/,$/, '') + ')'));
        } else if (start && line.trim().length === 0) {
            // keep going until next header
        } else if (start && line.includes('---')) {
            start = false;
        }
    }
    return list;
};

const newBlackspots = extractFromTxt('BLACKSPOTS');
const newPoliceStations = extractFromTxt('POLICE STATIONS');
const newCheckposts = extractFromTxt('CHECKPOSTS');

const filterPoints = (points) => {
    return points.filter(p => {
        for (const db of districtBoundaries) {
            if (isPointInPolygon(p.lat, p.lng, db.boundary)) return true;
        }
        return false;
    });
};

const filteredBlackspots = filterPoints(newBlackspots);
const filteredPoliceStations = filterPoints(newPoliceStations);
const filteredCheckposts = filterPoints(newCheckposts);

console.log(`Blackspots: New ${newBlackspots.length}, Valid ${filteredBlackspots.length}`);
console.log(`Police Stations: New ${newPoliceStations.length}, Valid ${filteredPoliceStations.length}`);
console.log(`Checkposts: New ${newCheckposts.length}, Valid ${filteredCheckposts.length}`);

// Reconstruct arrays
const allBlackspots = [...originalBlackspots, ...filteredBlackspots];

// We need to append to existing police stations and checkposts in gisData.ts
// Wait, I should probably replace them or append carefully.

const arrayToString = (arr) => {
    return '[\n' + arr.map(p => {
        let s = '  { ';
        Object.keys(p).forEach(k => {
            s += `${k}: ${typeof p[k] === 'string' ? `"${p[k]}"` : p[k]}, `;
        });
        return s.trim().replace(/,$/, '') + ' },';
    }).join('\n') + '\n]';
};

const replaceArray = (content, name, newArrStr) => {
    const startPattern = `export const ${name} = [`;
    const startIdx = content.indexOf(startPattern);
    if (startIdx === -1) return content;
    
    let bracketCount = 0;
    let foundStart = false;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '[') {
            bracketCount++;
            if (!foundStart) foundStart = true;
        }
        if (content[i] === ']') {
            bracketCount--;
        }
        if (foundStart && bracketCount === 0) {
            endIdx = i;
            break;
        }
    }
    return content.substring(0, startIdx + startPattern.length - 1) + newArrStr + content.substring(endIdx + 1);
};

// Update Blackspots
let updatedContent = replaceArray(content, 'blackSpotVillages', arrayToString(allBlackspots));

// For Police Stations and Checkposts, we want to APPEND if they exist
const existingPoliceStations = eval(extractRawContent('policeStations'));
const allPoliceStations = [...existingPoliceStations, ...filteredPoliceStations];
updatedContent = replaceArray(updatedContent, 'policeStations', arrayToString(allPoliceStations));

const existingCheckposts = eval(extractRawContent('checkpostLocations'));
const allCheckposts = [...existingCheckposts, ...filteredCheckposts];
updatedContent = replaceArray(updatedContent, 'checkpostLocations', arrayToString(allCheckposts));

fs.writeFileSync('src/data/gisData.ts', updatedContent);
console.log('Successfully repaired and expanded gisData.ts');
