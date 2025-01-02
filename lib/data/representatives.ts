import { pincodes } from './pincodes';

// Generate consistent dummy data based on PIN code
export function generateRepresentativeData(pincode: string) {
  const pincodeData = pincodes.find(p => p.code === pincode);
  
  if (!pincodeData) {
    throw new Error('PIN code not found in our database');
  }

  const { city, area, state } = pincodeData;

  return {
    mla: {
      name: `${area} MLA Representative`,
      party: ['BJP', 'INC', 'AAP', 'SS', 'TMC'][Math.floor(Math.random() * 5)],
      phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      email: `mla.${area.toLowerCase().replace(/\s+/g, '')}@assembly.${state.toLowerCase().replace(/\s+/g, '')}.gov.in`,
      constituency: `${area} Assembly Constituency`
    },
    mp: {
      name: `${city} MP Representative`,
      party: ['BJP', 'INC', 'AAP', 'SS', 'TMC'][Math.floor(Math.random() * 5)],
      phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      email: `mp.${city.toLowerCase().replace(/\s+/g, '')}@parliament.gov.in`,
      constituency: `${city} Parliamentary Constituency`
    },
    corporators: [
      {
        name: `${area} Ward A Corporator`,
        party: ['BJP', 'INC', 'AAP', 'SS', 'TMC'][Math.floor(Math.random() * 5)],
        phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        email: `corporator.${area.toLowerCase().replace(/\s+/g, '')}@${city.toLowerCase().replace(/\s+/g, '')}.gov.in`,
        ward: `${area} Ward A`
      },
      {
        name: `${area} Ward B Corporator`,
        party: ['BJP', 'INC', 'AAP', 'SS', 'TMC'][Math.floor(Math.random() * 5)],
        phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        email: `corporator.${area.toLowerCase().replace(/\s+/g, '')}@${city.toLowerCase().replace(/\s+/g, '')}.gov.in`,
        ward: `${area} Ward B`
      }
    ]
  };
}