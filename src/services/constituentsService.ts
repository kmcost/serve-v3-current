export interface ConstituentRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  politicalAffiliation: 'Democrat' | 'Republican' | 'Independent' | 'Other';
  priorityIssues: string[];
  optInEmail: boolean;
  optInSMS: boolean;
  hasEngaged: boolean;
  createdAt: string;
  age: '18-25' | '25-35' | '35-50' | '50+';
  familyStatus: 'Parent/Guardian' | 'Not a parent/guardian' | 'Unknown';
  ward: string;
  isBusinessOwner: boolean;
}

const priorityIssueCategories = [
  'Housing & Development',
  'Transportation & Traffic',
  'Education & Schools',
  'Parks & Recreation',
  'Public Safety',
  'Environment & Sustainability',
  'Economic Development',
  'Infrastructure & Utilities',
  'Budget & Taxes',
  'Community Services'
];

const politicalAffiliations: ConstituentRecord['politicalAffiliation'][] = [
  'Democrat', 'Republican', 'Independent', 'Other'
];

const ageGroups: ConstituentRecord['age'][] = [
  '18-25', '25-35', '35-50', '50+'
];

const familyStatuses: ConstituentRecord['familyStatus'][] = [
  'Parent/Guardian', 'Not a parent/guardian', 'Unknown'
];

const wards = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 
  'Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10'
];

const firstNames = [
  'Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'Robert', 'Michelle', 'James',
  'Amanda', 'Christopher', 'Ashley', 'Daniel', 'Jessica', 'Matthew', 'Emily',
  'Andrew', 'Stephanie', 'Joshua', 'Rachel', 'Ryan', 'Lauren', 'Justin', 'Megan',
  'Brandon', 'Nicole', 'Tyler', 'Samantha', 'Kevin', 'Elizabeth', 'Jonathan',
  'Brittany', 'Anthony', 'Danielle', 'Mark', 'Rebecca', 'Steven', 'Katherine',
  'Adam', 'Amy', 'Brian', 'Angela', 'John', 'Heather', 'Joseph', 'Melissa',
  'William', 'Crystal', 'Thomas', 'Kimberly', 'Richard'
];

const lastNames = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
  'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
  'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell',
  'Mitchell', 'Carter', 'Roberts', 'Gomez'
];

function generatePhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${exchange}-${number}`;
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  return `${username}@${domain}`;
}

function getRandomItems<T>(array: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateConstituents(): ConstituentRecord[] {
  const constituents: ConstituentRecord[] = [];
  
  for (let i = 0; i < 52; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = generateEmail(firstName, lastName);
    const phone = generatePhoneNumber();
    const politicalAffiliation = politicalAffiliations[Math.floor(Math.random() * politicalAffiliations.length)];
    const priorityIssues = getRandomItems(priorityIssueCategories, 0, 3);
    const optInEmail = Math.random() > 0.2; // 80% opt-in rate
    const optInSMS = Math.random() > 0.4; // 60% opt-in rate
    const hasEngaged = Math.random() > 0.3; // 70% engagement rate
    const age = ageGroups[Math.floor(Math.random() * ageGroups.length)];
    const familyStatus = familyStatuses[Math.floor(Math.random() * familyStatuses.length)];
    const ward = wards[Math.floor(Math.random() * wards.length)];
    const isBusinessOwner = Math.random() > 0.7; // 30% business owner rate
    
    constituents.push({
      id: `constituent-${i + 1}`,
      firstName,
      lastName,
      email,
      phone,
      politicalAffiliation,
      priorityIssues,
      optInEmail,
      optInSMS,
      hasEngaged,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      age,
      familyStatus,
      ward,
      isBusinessOwner
    });
  }
  
  return constituents.sort((a, b) => a.lastName.localeCompare(b.lastName));
}

export const constituentsData = generateConstituents();

export function getConstituents(): ConstituentRecord[] {
  return constituentsData;
}

export function getConstituentStats() {
  const total = constituentsData.length;
  const optInEmail = constituentsData.filter(c => c.optInEmail).length;
  const optInSMS = constituentsData.filter(c => c.optInSMS).length;
  
  return {
    totalConstituents: total,
    optInEmailCount: optInEmail,
    optInSMSCount: optInSMS
  };
}

export function searchConstituents(query: string): ConstituentRecord[] {
  if (!query.trim()) {
    return constituentsData;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return constituentsData.filter(constituent => {
    const fullName = `${constituent.firstName} ${constituent.lastName}`.toLowerCase();
    const email = constituent.email.toLowerCase();
    const phone = constituent.phone.replace(/\D/g, '');
    const searchPhone = searchTerm.replace(/\D/g, '');
    
    return fullName.includes(searchTerm) ||
           email.includes(searchTerm) ||
           phone.includes(searchPhone);
  });
}
