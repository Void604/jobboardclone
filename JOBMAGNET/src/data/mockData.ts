import { User, Job, JobSeeker, Employer, Admin, Application, Notification } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate date strings
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const daysAhead = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Sample users
export const mockUsers: (JobSeeker | Employer | Admin)[] = [
  // Job Seekers
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'jobseeker',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: daysAgo(90),
    resume: 'resume_alex.pdf',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    education: [
      {
        id: uuidv4(),
        institution: 'University of Technology',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: '2018-09-01',
        endDate: '2022-05-30',
        current: false,
        description: 'Graduated with honors',
      }
    ],
    experience: [
      {
        id: uuidv4(),
        company: 'Tech Innovators',
        position: 'Junior Developer',
        location: 'Remote',
        startDate: '2022-06-15',
        endDate: '2023-07-30',
        current: false,
        description: 'Worked on front-end development using React',
      }
    ],
    applications: ['app1', 'app2']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'jobseeker',
    profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: daysAgo(75),
    resume: 'resume_priya.pdf',
    skills: ['UI/UX Design', 'Adobe XD', 'Figma', 'Sketch'],
    education: [
      {
        id: uuidv4(),
        institution: 'Design Institute',
        degree: 'Bachelor',
        field: 'User Interface Design',
        startDate: '2019-08-15',
        endDate: '2023-06-01',
        current: false,
        description: 'Focused on interactive design systems',
      }
    ],
    experience: [
      {
        id: uuidv4(),
        company: 'Creative Solutions',
        position: 'UI Design Intern',
        location: 'Mumbai',
        startDate: '2022-05-01',
        endDate: '2022-08-30',
        current: false,
        description: 'Designed interfaces for mobile applications',
      }
    ],
    applications: ['app3']
  },

  // Employers
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@techcorp.com',
    role: 'employer',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: daysAgo(120),
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.pexels.com/photos/15387347/pexels-photo-15387347/free-photo-of-letter-t-for-logo.jpeg?auto=compress&cs=tinysrgb&w=300',
    industry: 'Information Technology',
    location: 'San Francisco, CA',
    about: 'TechCorp is a leading technology company specializing in innovative software solutions.',
    website: 'https://techcorp.example.com',
    jobsPosted: ['job1', 'job2', 'job3']
  },
  {
    id: '4',
    name: 'Raj Patel',
    email: 'raj@innovatech.com',
    role: 'employer',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: daysAgo(110),
    company: 'InnovaTech',
    companyLogo: 'https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=300',
    industry: 'Software Development',
    location: 'Bangalore, India',
    about: 'InnovaTech creates cutting-edge software products for global clients.',
    website: 'https://innovatech.example.com',
    jobsPosted: ['job4', 'job5']
  },

  // Admin
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@jobmagnet.com',
    role: 'admin',
    createdAt: daysAgo(150),
    permissions: ['manage_users', 'manage_jobs', 'manage_applications', 'site_settings']
  }
];

// Sample jobs
export const mockJobs: Job[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.pexels.com/photos/15387347/pexels-photo-15387347/free-photo-of-letter-t-for-logo.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'San Francisco, CA (Remote)',
    salary: '$120,000 - $150,000',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces and experiences for our web applications.',
    requirements: [
      'At least 5 years of experience with JavaScript/TypeScript',
      'Strong experience with React and modern front-end frameworks',
      'Experience with state management libraries (Redux, MobX, etc.)',
      'Good understanding of web performance optimization',
      'Experience with responsive design and cross-browser compatibility'
    ],
    responsibilities: [
      'Develop and maintain user interfaces for web applications',
      'Collaborate with designers and backend developers',
      'Write clean, maintainable, and efficient code',
      'Optimize applications for maximum speed and scalability',
      'Ensure cross-platform optimization for mobile and desktop'
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Redux', 'HTML/CSS', 'Webpack'],
    employerId: '3',
    postedDate: daysAgo(10),
    expiryDate: daysAhead(20),
    applicants: ['1'],
    status: 'active',
    featured: true
  },
  {
    id: 'job2',
    title: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.pexels.com/photos/15387347/pexels-photo-15387347/free-photo-of-letter-t-for-logo.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'New York, NY',
    salary: '$100,000 - $130,000',
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
    description: 'We are seeking a Full Stack Developer to design and develop web applications using React and Node.js.',
    requirements: [
      'At least 3 years of experience with full stack development',
      'Strong knowledge of JavaScript/TypeScript',
      'Experience with React, Node.js, and databases',
      'Understanding of server-side rendering and API design',
      'Knowledge of Git and CI/CD pipelines'
    ],
    responsibilities: [
      'Develop both frontend and backend components',
      'Implement responsive design and ensure cross-browser compatibility',
      'Design and implement database schemas',
      'Optimize application for performance and scalability',
      'Participate in code reviews and contribute to team standards'
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    employerId: '3',
    postedDate: daysAgo(15),
    expiryDate: daysAhead(15),
    applicants: ['1', '2'],
    status: 'active',
    featured: false
  },
  {
    id: 'job3',
    title: 'Product Designer',
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.pexels.com/photos/15387347/pexels-photo-15387347/free-photo-of-letter-t-for-logo.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'Boston, MA (Hybrid)',
    salary: '$90,000 - $120,000',
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
    description: 'We are looking for a Product Designer to create intuitive and engaging user experiences for our products.',
    requirements: [
      '3+ years of experience in UI/UX design',
      'Proficiency with design tools like Figma, Sketch, or Adobe XD',
      'Strong portfolio demonstrating user-centered design thinking',
      'Experience with design systems and component libraries',
      'Understanding of user research and usability testing'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and engineers',
      'Conduct user research and usability testing',
      'Contribute to and maintain design systems',
      'Stay up-to-date with design trends and best practices'
    ],
    skills: ['UI/UX Design', 'Figma', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    employerId: '3',
    postedDate: daysAgo(5),
    expiryDate: daysAhead(25),
    applicants: ['2'],
    status: 'active',
    featured: true
  },
  {
    id: 'job4',
    title: 'Mobile App Developer',
    company: 'InnovaTech',
    companyLogo: 'https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'Bangalore, India',
    salary: '₹10,00,000 - ₹16,00,000',
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
    description: 'InnovaTech is looking for a Mobile App Developer to build and maintain high-quality mobile applications.',
    requirements: [
      '3+ years experience in mobile app development',
      'Strong knowledge of React Native or Flutter',
      'Experience with native app development is a plus',
      'Understanding of RESTful APIs and integration',
      'Knowledge of app store submission processes'
    ],
    responsibilities: [
      'Develop and maintain mobile applications for iOS and Android',
      'Work with cross-functional teams to define and implement features',
      'Ensure the performance, quality, and responsiveness of applications',
      'Identify and fix bugs and performance bottlenecks',
      'Continuously discover, evaluate, and implement new technologies'
    ],
    skills: ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'REST APIs', 'Mobile UI Design'],
    employerId: '4',
    postedDate: daysAgo(7),
    expiryDate: daysAhead(23),
    applicants: [],
    status: 'active',
    featured: false
  },
  {
    id: 'job5',
    title: 'Data Scientist Intern',
    company: 'InnovaTech',
    companyLogo: 'https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'Remote',
    salary: '₹25,000 - ₹40,000 monthly',
    employmentType: 'internship',
    experienceLevel: 'entry',
    description: 'InnovaTech is offering a Data Science internship opportunity for students or recent graduates interested in data analysis and machine learning.',
    requirements: [
      'Currently pursuing or recently completed degree in Computer Science, Statistics, or related field',
      'Basic knowledge of Python, R, or similar programming languages',
      'Understanding of basic statistical concepts',
      'Eagerness to learn and passion for data science',
      'Good communication skills'
    ],
    responsibilities: [
      'Assist in data collection, cleaning, and preprocessing',
      'Help in implementing machine learning algorithms',
      'Contribute to data visualization and reporting',
      'Participate in team meetings and brainstorming sessions',
      'Learn and apply new techniques in data science'
    ],
    skills: ['Python', 'Data Analysis', 'Statistics', 'Machine Learning', 'Data Visualization'],
    employerId: '4',
    postedDate: daysAgo(3),
    expiryDate: daysAhead(27),
    applicants: [],
    status: 'active',
    featured: true
  },
  {
    id: 'job6',
    title: 'DevOps Engineer',
    company: 'CloudNative Systems',
    companyLogo: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=300',
    location: 'Chicago, IL (Remote)',
    salary: '$110,000 - $140,000',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    description: 'CloudNative Systems is looking for a DevOps Engineer to build and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      '5+ years of experience in DevOps or SRE roles',
      'Strong knowledge of AWS, Azure, or GCP',
      'Experience with containerization (Docker, Kubernetes)',
      'Experience with Infrastructure as Code (Terraform, CloudFormation)',
      'Knowledge of CI/CD pipelines (Jenkins, GitHub Actions, etc.)'
    ],
    responsibilities: [
      'Design, implement, and maintain cloud infrastructure',
      'Automate application deployments and infrastructure provisioning',
      'Implement monitoring and alerting systems',
      'Optimize performance, reliability, and cost of cloud resources',
      'Collaborate with development teams to improve deployment processes'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring'],
    employerId: '3',
    postedDate: daysAgo(12),
    expiryDate: daysAhead(18),
    applicants: [],
    status: 'active',
    featured: false
  }
];

// Sample applications
export const mockApplications: Application[] = [
  {
    id: 'app1',
    jobId: 'job1',
    jobseekerId: '1',
    appliedDate: daysAgo(8),
    resume: 'resume_alex_updated.pdf',
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position...',
    status: 'shortlisted',
    notes: 'Strong React skills, good fit for the team'
  },
  {
    id: 'app2',
    jobId: 'job2',
    jobseekerId: '1',
    appliedDate: daysAgo(12),
    resume: 'resume_alex.pdf',
    coverLetter: 'I believe my full stack experience makes me a great candidate...',
    status: 'pending',
    notes: ''
  },
  {
    id: 'app3',
    jobId: 'job3',
    jobseekerId: '2',
    appliedDate: daysAgo(4),
    resume: 'resume_priya.pdf',
    coverLetter: 'With my background in UI/UX design, I am confident I can contribute...',
    status: 'reviewed',
    notes: 'Impressive portfolio, schedule an interview'
  }
];

// Sample notifications
export const mockNotifications: Notification[] = [
  {
    id: uuidv4(),
    userId: '1',
    title: 'Application Update',
    message: 'Your application for Senior Frontend Developer has been shortlisted.',
    type: 'success',
    read: false,
    createdAt: daysAgo(2),
    link: '/applications/app1'
  },
  {
    id: uuidv4(),
    userId: '3',
    title: 'New Applicant',
    message: 'Alex Johnson has applied for the Senior Frontend Developer position.',
    type: 'info',
    read: true,
    createdAt: daysAgo(8),
    link: '/employer/applications/app1'
  },
  {
    id: uuidv4(),
    userId: '2',
    title: 'Application Status',
    message: 'Your application for Product Designer is under review.',
    type: 'info',
    read: false,
    createdAt: daysAgo(3),
    link: '/applications/app3'
  },
  {
    id: uuidv4(),
    userId: '4',
    title: 'Job Posting Expiring',
    message: 'Your job posting for Mobile App Developer will expire in 5 days.',
    type: 'warning',
    read: false,
    createdAt: daysAgo(1),
    link: '/employer/jobs/job4'
  },
  {
    id: uuidv4(),
    userId: '5',
    title: 'New User Registration',
    message: 'There are 5 new user registrations in the last 24 hours.',
    type: 'info',
    read: true,
    createdAt: daysAgo(1),
    link: '/admin/users'
  }
];