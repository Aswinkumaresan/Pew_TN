import fs from 'fs';
const districts = ['Chennai', 'Tiruvallur', 'Kancheepuram', 'Chengalpattu', 'Vellore', 'Ranipet', 'Tirupattur', 'Tiruvannamalai', 'Krishnagiri', 'Dharmapuri', 'Salem', 'Namakkal', 'Erode', 'Tiruppur', 'Coimbatore', 'Nilgiris', 'Karur', 'Tiruchirappalli', 'Perambalur', 'Ariyalur', 'Kallakurichi', 'Viluppuram', 'Cuddalore', 'Mayiladuthurai', 'Nagapattinam', 'Tiruvarur', 'Thanjavur', 'Pudukkottai', 'Sivaganga', 'Madurai', 'Dindigul', 'Theni', 'Virudhunagar', 'Ramanathapuram', 'Thoothukudi', 'Tirunelveli', 'Tenkasi', 'Kanyakumari'];
// Roughly bounding box for TN
const bounds = { lat: [8.1, 13.4], lng: [76.5, 80.2] };

const generatePoints = (count, namePrefix) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat = (Math.random() * (bounds.lat[1] - bounds.lat[0]) + bounds.lat[0]).toFixed(6);
    const lng = (Math.random() * (bounds.lng[1] - bounds.lng[0]) + bounds.lng[0]).toFixed(6);
    const district = districts[Math.floor(Math.random() * districts.length)];
    points.push({ name: `${namePrefix} ${i + 1}`, lat: parseFloat(lat), lng: parseFloat(lng), district });
  }
  return points;
};

const formatOutput = (points, type) => {
    if (type === 'blackspot') {
        return points.map(p => `  { name: "${p.name}", lat: ${p.lat}, lng: ${p.lng}, district: "${p.district}", ps: "${p.district} PS" },`).join('\n');
    }
    return points.map(p => `  { name: "${p.name}", lat: ${p.lat}, lng: ${p.lng}, district: "${p.district}" },`).join('\n');
};

let output = '';
output += '// --- BLACKSPOTS ---\n';
output += formatOutput(generatePoints(200, 'Blackspot'), 'blackspot');

output += '\n\n// --- POLICE STATIONS ---\n';
output += formatOutput(generatePoints(50, 'Police Station'), 'ps');

output += '\n\n// --- CHECKPOSTS ---\n';
output += formatOutput(generatePoints(30, 'Checkpost'), 'checkpost');

fs.writeFileSync('generated_gis_points.txt', output, 'utf8');
console.log('Generated successfully');
