import { encoded, translations } from './data.js';

function decodeEncodedData(encoded, translations) {
  return encoded.map(item => {
    const decodedItem = { ...item };

    for (const key in decodedItem) {
      if (key.endsWith("Id") && !["groupId", "service", "formatSize", "ca"].includes(key)) {
        const id = decodedItem[key];
        if (translations[id] !== undefined) {
          decodedItem[key] = translations[id];
        }
      }
    }

    return decodedItem;
  });
}

const decodedData = decodeEncodedData(encoded, translations);

console.log("Decoded Data:");
console.log(decodedData);

const uniqueIds = encoded.reduce((acc, item) => {
  const values = Object.values(item).filter(value => value !== null && !["groupId", "service", "formatSize", "ca"].includes(value));
  return acc.concat(values);
}, []);

const uniqueIdsSet = new Set(uniqueIds);

console.log("Unique IDs:");
console.log([...uniqueIdsSet]);
