const fs = require('fs');
let content = fs.readFileSync('src/components/sections/RagSection.jsx', 'utf8');

// The corrupted characters might contain invisible unicode or just the replacement character 
content = content.replace(/\+\"/g, '&#8595;');
content = content.replace(/\+'/g, '&#8594;');

// Just in case it's literally just +" or +'
content = content.replace(/>\+\"</g, '>&#8595;<');
content = content.replace(/>\+'</g, '>&#8594;<');
content = content.replace(/ \+\"</g, ' &#8595;<');

fs.writeFileSync('src/components/sections/RagSection.jsx', content);
console.log("Replaced invalid characters.");
