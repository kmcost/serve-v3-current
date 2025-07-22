
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
    const priorityIssues = getRandomItems(priorityIssueCategories, 0, 4);
    const optInEmail = Math.random() > 0.2; // 80% opt-in rate
    const optInSMS = Math.random() > 0.4; // 60% opt-in rate
    const hasEngaged = Math.random() > 0.3; // 70% engagement rate
    
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
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
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
  const engaged = constituentsData.filter(c => c.hasEngaged).length;
  const engagementPercentage = Math.round((engaged / total) * 100);
  
  return {
    totalConstituents: total,
    optInEmailCount: optInEmail,
    optInSMSCount: optInSMS,
    engagementPercentage
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
