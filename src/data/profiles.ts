export interface Profile {
  id: number
  name: string
  slug: string
  profession: string
  location: string
  avatar: string
  verified: boolean
  publicFigure: boolean
  lastUpdated: string
  bio: string
  email?: string
  phone?: string
  website?: string
  linkedin?: string
  twitter?: string
  skills: string[]
  
  // Profile Statistics
  stats: {
    profileViews: number
    totalViews: number
    monthlyViews: number
    profileCompleteness: number
    connectionsCount: number
    endorsements: number
    profileRank: number
    joinedDate: string
    lastActiveDate: string
    responseRate: number
    averageResponseTime: string // in hours
    profileShares: number
    bookmarks: number
    searchAppearances: number
    industryRanking: number
  }
  
  personalInfo: {
    birthDate: string
    birthPlace: string
    nationality: string
    languages: string[]
    maritalStatus: string
    children: number
    residence: string
  }
  
  interests: Array<{
    category: string
    items: string[]
  }>
  
  publications?: Array<{
    title: string
    journal: string
    year: string
  }>
  
  career: Array<{
    id: number
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    description: string
  }>
  
  education: Array<{
    id: number
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  
  achievements: Array<{
    id: number
    title: string
    organization: string
    date: string
    description: string
  }>
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    profession: 'AI Research Scientist',
    location: 'San Francisco, CA, USA',
    avatar: '/placeholder-avatar-1.jpg',
    verified: true,
    publicFigure: false,
    lastUpdated: '2024-01-15',
    bio: 'Passionate AI researcher with 8+ years of experience in machine learning and neural networks. Currently leading breakthrough research in natural language processing at a top tech company. Published 25+ papers in top-tier conferences and holds 12 patents in AI/ML.',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://sarahchen.ai',
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen_ai',
    skills: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Python', 'TensorFlow', 'Research', 'AI Ethics'],
    
    stats: {
      profileViews: 15420,
      totalViews: 89340,
      monthlyViews: 3240,
      profileCompleteness: 95,
      connectionsCount: 1247,
      endorsements: 89,
      profileRank: 12,
      joinedDate: '2019-03-15',
      lastActiveDate: '2024-01-15',
      responseRate: 92,
      averageResponseTime: '4.2',
      profileShares: 156,
      bookmarks: 234,
      searchAppearances: 2840,
      industryRanking: 8
    },
    
    personalInfo: {
      birthDate: '1988-03-15',
      birthPlace: 'Vancouver, BC, Canada',
      nationality: 'Canadian-American',
      languages: ['English (Native)', 'Mandarin (Fluent)', 'French (Conversational)'],
      maritalStatus: 'Married',
      children: 2,
      residence: 'San Francisco, CA, USA'
    },
    
    interests: [
      { category: 'Technology', items: ['Quantum Computing', 'Robotics', 'Blockchain'] },
      { category: 'Hobbies', items: ['Photography', 'Rock Climbing', 'Classical Piano'] },
      { category: 'Sports', items: ['Tennis', 'Hiking', 'Yoga'] },
      { category: 'Arts', items: ['Contemporary Art', 'Jazz Music', 'Documentary Films'] }
    ],
    
    publications: [
      { title: 'Advances in Neural Language Models', journal: 'Nature Machine Intelligence', year: '2023' },
      { title: 'Ethical AI: A Framework for Responsible Development', journal: 'AI Ethics Journal', year: '2022' },
      { title: 'Transformer Architectures for Multi-Modal Learning', journal: 'ICML Proceedings', year: '2021' }
    ],
    
    career: [
      {
        id: 1,
        title: 'Senior AI Research Scientist',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2021-03',
        endDate: null,
        description: 'Leading a team of 8 researchers working on next-generation NLP models. Developed breakthrough algorithms that improved model accuracy by 23%.'
      },
      {
        id: 2,
        title: 'AI Research Scientist',
        company: 'InnovateLab',
        location: 'Palo Alto, CA',
        startDate: '2018-06',
        endDate: '2021-02',
        description: 'Conducted cutting-edge research in computer vision and deep learning. Published 12 papers in top conferences including NeurIPS and ICML.'
      },
      {
        id: 3,
        title: 'Machine Learning Engineer',
        company: 'DataTech Solutions',
        location: 'San Jose, CA',
        startDate: '2016-01',
        endDate: '2018-05',
        description: 'Built and deployed ML models for production systems serving millions of users. Improved recommendation system performance by 40%.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'Ph.D. in Computer Science',
        institution: 'Stanford University',
        location: 'Stanford, CA',
        startDate: '2012-09',
        endDate: '2016-06',
        description: 'Dissertation: "Advanced Neural Architectures for Natural Language Understanding"'
      },
      {
        id: 2,
        degree: 'M.S. in Computer Science',
        institution: 'MIT',
        location: 'Cambridge, MA',
        startDate: '2010-09',
        endDate: '2012-06',
        description: 'Specialized in Artificial Intelligence and Machine Learning'
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: 'Best Paper Award',
        organization: 'NeurIPS 2023',
        date: '2023-12',
        description: 'Recognized for groundbreaking work in transformer architectures'
      },
      {
        id: 2,
        title: 'AI Researcher of the Year',
        organization: 'Tech Innovation Awards',
        date: '2022-11',
        description: 'Honored for contributions to ethical AI development'
      },
      {
        id: 3,
        title: 'Patent: Neural Network Optimization',
        organization: 'USPTO',
        date: '2021-08',
        description: 'Patent #US11,234,567 for novel neural network optimization techniques'
      }
    ]
  },
  
  {
    id: 2,
    name: 'Marcus Johnson',
    slug: 'marcus-johnson',
    profession: 'Entrepreneur',
    location: 'New York, NY, USA',
    avatar: '/placeholder-avatar-2.jpg',
    verified: true,
    publicFigure: true,
    lastUpdated: '2024-01-10',
    bio: 'Serial entrepreneur and investor with over 15 years of experience building and scaling technology companies. Founded three successful startups in fintech, with two successful exits totaling over $500M. Currently serves as Managing Partner at Venture Capital firm focusing on early-stage fintech and AI companies.',
    email: 'marcus@johnsonventures.com',
    website: 'https://marcusjohnson.com',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    twitter: 'https://twitter.com/marcusj_vc',
    skills: ['Entrepreneurship', 'Venture Capital', 'Fintech', 'Strategic Planning', 'Team Building', 'Product Strategy', 'Fundraising'],
    
    stats: {
      profileViews: 28750,
      totalViews: 156890,
      monthlyViews: 5680,
      profileCompleteness: 98,
      connectionsCount: 2834,
      endorsements: 156,
      profileRank: 3,
      joinedDate: '2018-01-20',
      lastActiveDate: '2024-01-10',
      responseRate: 88,
      averageResponseTime: '2.8',
      profileShares: 342,
      bookmarks: 567,
      searchAppearances: 4920,
      industryRanking: 2
    },
    
    personalInfo: {
      birthDate: '1982-07-22',
      birthPlace: 'Chicago, IL, USA',
      nationality: 'American',
      languages: ['English (Native)', 'Spanish (Fluent)', 'Portuguese (Conversational)'],
      maritalStatus: 'Married',
      children: 3,
      residence: 'New York, NY, USA'
    },
    
    interests: [
      { category: 'Business', items: ['Emerging Markets', 'Cryptocurrency', 'Sustainable Finance'] },
      { category: 'Sports', items: ['Marathon Running', 'Golf', 'Sailing'] },
      { category: 'Travel', items: ['Adventure Travel', 'Cultural Immersion', 'Food Tourism'] },
      { category: 'Philanthropy', items: ['Education Access', 'Financial Literacy', 'Youth Entrepreneurship'] }
    ],
    
    career: [
      {
        id: 1,
        title: 'Managing Partner',
        company: 'Johnson Ventures',
        location: 'New York, NY',
        startDate: '2020-01',
        endDate: null,
        description: 'Leading $200M early-stage venture fund focused on fintech and AI startups. Portfolio includes 25+ companies with 3 unicorns.'
      },
      {
        id: 2,
        title: 'Co-Founder & CEO',
        company: 'PayFlow Technologies',
        location: 'New York, NY',
        startDate: '2015-03',
        endDate: '2019-12',
        description: 'Built and scaled B2B payment platform serving 10,000+ businesses. Successfully exited to major financial institution for $250M.'
      },
      {
        id: 3,
        title: 'Founder & CEO',
        company: 'FinanceFirst',
        location: 'Chicago, IL',
        startDate: '2010-06',
        endDate: '2015-02',
        description: 'Created personal finance management app with 2M+ users. Acquired by major bank for $150M.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'MBA',
        institution: 'Harvard Business School',
        location: 'Boston, MA',
        startDate: '2008-09',
        endDate: '2010-05',
        description: 'Concentrated in Entrepreneurship and Finance'
      },
      {
        id: 2,
        degree: 'B.S. in Economics',
        institution: 'University of Chicago',
        location: 'Chicago, IL',
        startDate: '2000-09',
        endDate: '2004-06',
        description: 'Magna Cum Laude, Phi Beta Kappa'
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: 'Forbes 40 Under 40',
        organization: 'Forbes Magazine',
        date: '2018-03',
        description: 'Recognized as one of the most influential young entrepreneurs in fintech'
      },
      {
        id: 2,
        title: 'Entrepreneur of the Year',
        organization: 'Ernst & Young',
        date: '2017-11',
        description: 'Northeast region winner for technology entrepreneurship'
      },
      {
        id: 3,
        title: 'TechCrunch Disruptor Award',
        organization: 'TechCrunch',
        date: '2016-09',
        description: 'Recognized for innovation in financial technology'
      }
    ]
  },
  
  {
    id: 3,
    name: 'Elena Rodriguez',
    slug: 'elena-rodriguez',
    profession: 'Climate Scientist',
    location: 'Barcelona, Spain',
    avatar: '/placeholder-avatar-3.jpg',
    verified: true,
    publicFigure: false,
    lastUpdated: '2024-01-08',
    bio: 'Leading climate scientist specializing in Mediterranean climate patterns and sustainable urban development. Research focuses on climate adaptation strategies for coastal cities. Published over 40 peer-reviewed papers and serves as advisor to the European Union on climate policy.',
    email: 'elena.rodriguez@icm.csic.es',
    website: 'https://elenaclimate.org',
    linkedin: 'https://linkedin.com/in/elenarodriguezclimate',
    skills: ['Climate Science', 'Environmental Policy', 'Data Analysis', 'Research', 'Sustainability', 'Urban Planning', 'Public Speaking'],
    
    stats: {
      profileViews: 8940,
      totalViews: 42680,
      monthlyViews: 1850,
      profileCompleteness: 91,
      connectionsCount: 687,
      endorsements: 45,
      profileRank: 28,
      joinedDate: '2020-09-12',
      lastActiveDate: '2024-01-08',
      responseRate: 95,
      averageResponseTime: '6.1',
      profileShares: 78,
      bookmarks: 134,
      searchAppearances: 1560,
      industryRanking: 15
    },
    
    personalInfo: {
      birthDate: '1985-11-03',
      birthPlace: 'Valencia, Spain',
      nationality: 'Spanish',
      languages: ['Spanish (Native)', 'English (Fluent)', 'French (Fluent)', 'Catalan (Native)'],
      maritalStatus: 'Single',
      children: 0,
      residence: 'Barcelona, Spain'
    },
    
    interests: [
      { category: 'Environment', items: ['Marine Conservation', 'Renewable Energy', 'Biodiversity'] },
      { category: 'Culture', items: ['Mediterranean History', 'Architecture', 'Local Cuisine'] },
      { category: 'Outdoor', items: ['Hiking', 'Scuba Diving', 'Cycling'] },
      { category: 'Arts', items: ['Photography', 'Painting', 'Classical Guitar'] }
    ],
    
    publications: [
      { title: 'Climate Adaptation in Mediterranean Coastal Cities', journal: 'Nature Climate Change', year: '2023' },
      { title: 'Urban Heat Islands: Mitigation Strategies for Southern Europe', journal: 'Environmental Research Letters', year: '2022' },
      { title: 'Sea Level Rise Projections for the Western Mediterranean', journal: 'Climate Dynamics', year: '2021' }
    ],
    
    career: [
      {
        id: 1,
        title: 'Senior Research Scientist',
        company: 'Institute of Marine Sciences (ICM-CSIC)',
        location: 'Barcelona, Spain',
        startDate: '2019-09',
        endDate: null,
        description: 'Leading research on climate change impacts in Mediterranean coastal regions. Managing €2M EU research grant on urban climate adaptation.'
      },
      {
        id: 2,
        title: 'Climate Research Fellow',
        company: 'Barcelona Supercomputing Center',
        location: 'Barcelona, Spain',
        startDate: '2016-01',
        endDate: '2019-08',
        description: 'Developed high-resolution climate models for regional climate projections. Collaborated with international research teams on IPCC reports.'
      },
      {
        id: 3,
        title: 'Environmental Consultant',
        company: 'EcoConsult Mediterranean',
        location: 'Valencia, Spain',
        startDate: '2013-06',
        endDate: '2015-12',
        description: 'Provided climate risk assessments for urban development projects across Spain and Portugal.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'Ph.D. in Environmental Sciences',
        institution: 'University of Barcelona',
        location: 'Barcelona, Spain',
        startDate: '2009-09',
        endDate: '2013-05',
        description: 'Dissertation: "Climate Change Impacts on Mediterranean Coastal Ecosystems"'
      },
      {
        id: 2,
        degree: 'M.S. in Atmospheric Sciences',
        institution: 'University of Valencia',
        location: 'Valencia, Spain',
        startDate: '2007-09',
        endDate: '2009-06',
        description: 'Specialized in Climate Modeling and Meteorology'
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: 'EU Marie Curie Fellowship',
        organization: 'European Commission',
        date: '2020-03',
        description: 'Prestigious research fellowship for climate adaptation research'
      },
      {
        id: 2,
        title: 'Young Scientist Award',
        organization: 'European Geosciences Union',
        date: '2018-04',
        description: 'Recognized for outstanding contributions to climate science'
      },
      {
        id: 3,
        title: 'Best Thesis Award',
        organization: 'Spanish Association of Climatology',
        date: '2014-01',
        description: 'Outstanding doctoral thesis in climate science'
      }
    ]
  },
  
  {
    id: 4,
    name: 'David Kim',
    slug: 'david-kim',
    profession: 'Software Architect',
    location: 'Seoul, South Korea',
    avatar: '/placeholder-avatar-4.jpg',
    verified: true,
    publicFigure: false,
    lastUpdated: '2024-01-12',
    bio: 'Senior software architect with 12+ years of experience designing and building large-scale distributed systems. Currently leading the architecture team at a major e-commerce platform serving 50M+ users. Expert in microservices, cloud infrastructure, and system scalability.',
    email: 'david.kim@techseoul.com',
    linkedin: 'https://linkedin.com/in/davidkim-architect',
    skills: ['System Architecture', 'Microservices', 'Cloud Computing', 'Kubernetes', 'Java', 'Python', 'DevOps', 'Scalability'],
    
    stats: {
      profileViews: 12340,
      totalViews: 67890,
      monthlyViews: 2450,
      profileCompleteness: 88,
      connectionsCount: 934,
      endorsements: 67,
      profileRank: 19,
      joinedDate: '2019-11-08',
      lastActiveDate: '2024-01-12',
      responseRate: 89,
      averageResponseTime: '5.7',
      profileShares: 98,
      bookmarks: 187,
      searchAppearances: 2180,
      industryRanking: 12
    },
    
    personalInfo: {
      birthDate: '1986-09-12',
      birthPlace: 'Busan, South Korea',
      nationality: 'South Korean',
      languages: ['Korean (Native)', 'English (Fluent)', 'Japanese (Conversational)'],
      maritalStatus: 'Married',
      children: 1,
      residence: 'Seoul, South Korea'
    },
    
    interests: [
      { category: 'Technology', items: ['Open Source', 'DevOps', 'Cloud Native'] },
      { category: 'Gaming', items: ['Strategy Games', 'Game Development', 'Esports'] },
      { category: 'Culture', items: ['Korean Traditional Music', 'Calligraphy', 'Tea Ceremony'] },
      { category: 'Fitness', items: ['Taekwondo', 'Rock Climbing', 'Cycling'] }
    ],
    
    career: [
      {
        id: 1,
        title: 'Principal Software Architect',
        company: 'KoreaTech Commerce',
        location: 'Seoul, South Korea',
        startDate: '2020-03',
        endDate: null,
        description: 'Leading architecture for e-commerce platform serving 50M+ users. Designed microservices architecture that improved system reliability by 99.9%.'
      },
      {
        id: 2,
        title: 'Senior Software Engineer',
        company: 'Samsung Electronics',
        location: 'Seoul, South Korea',
        startDate: '2016-01',
        endDate: '2020-02',
        description: 'Developed cloud infrastructure for IoT devices. Led team of 12 engineers building scalable backend services.'
      },
      {
        id: 3,
        title: 'Software Engineer',
        company: 'Naver Corporation',
        location: 'Seoul, South Korea',
        startDate: '2012-03',
        endDate: '2015-12',
        description: 'Built search infrastructure handling billions of queries. Optimized system performance and reduced latency by 40%.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'M.S. in Computer Science',
        institution: 'KAIST',
        location: 'Daejeon, South Korea',
        startDate: '2010-03',
        endDate: '2012-02',
        description: 'Specialized in Distributed Systems and Database Management'
      },
      {
        id: 2,
        degree: 'B.S. in Computer Engineering',
        institution: 'Seoul National University',
        location: 'Seoul, South Korea',
        startDate: '2005-03',
        endDate: '2010-02',
        description: 'Summa Cum Laude, Outstanding Graduate Award'
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: 'Technical Excellence Award',
        organization: 'KoreaTech Commerce',
        date: '2023-12',
        description: 'Recognized for outstanding technical leadership and system design'
      },
      {
        id: 2,
        title: 'Open Source Contributor Award',
        organization: 'Apache Software Foundation',
        date: '2021-06',
        description: 'Significant contributions to Apache Kafka and Kubernetes projects'
      },
      {
        id: 3,
        title: 'Innovation Award',
        organization: 'Samsung Electronics',
        date: '2019-11',
        description: 'Innovative IoT cloud architecture design'
      }
    ]
  },
  
  {
    id: 5,
    name: 'Dr. Amara Okafor',
    slug: 'amara-okafor',
    profession: 'Neurosurgeon',
    location: 'London, UK',
    avatar: '/placeholder-avatar-5.jpg',
    verified: true,
    publicFigure: true,
    lastUpdated: '2024-01-05',
    bio: 'Renowned neurosurgeon and medical researcher specializing in minimally invasive brain surgery techniques. Pioneered several breakthrough procedures that have improved patient outcomes worldwide. Currently serves as Head of Neurosurgery at Royal London Hospital and Professor at Imperial College London.',
    email: 'a.okafor@imperial.ac.uk',
    website: 'https://amaraokafor.com',
    linkedin: 'https://linkedin.com/in/dr-amara-okafor',
    skills: ['Neurosurgery', 'Medical Research', 'Minimally Invasive Surgery', 'Brain Tumor Surgery', 'Medical Education', 'Clinical Trials'],
    
    stats: {
      profileViews: 34560,
      totalViews: 198750,
      monthlyViews: 6890,
      profileCompleteness: 97,
      connectionsCount: 3456,
      endorsements: 234,
      profileRank: 1,
      joinedDate: '2017-05-14',
      lastActiveDate: '2024-01-05',
      responseRate: 94,
      averageResponseTime: '3.4',
      profileShares: 456,
      bookmarks: 789,
      searchAppearances: 5670,
      industryRanking: 1
    },
    
    personalInfo: {
      birthDate: '1978-04-18',
      birthPlace: 'Lagos, Nigeria',
      nationality: 'British-Nigerian',
      languages: ['English (Native)', 'Yoruba (Native)', 'French (Conversational)'],
      maritalStatus: 'Married',
      children: 2,
      residence: 'London, UK'
    },
    
    interests: [
      { category: 'Medicine', items: ['Medical Innovation', 'Global Health', 'Medical Education'] },
      { category: 'Culture', items: ['African Art', 'Classical Music', 'Literature'] },
      { category: 'Philanthropy', items: ['Healthcare Access', 'Education in Africa', 'Women in Medicine'] },
      { category: 'Wellness', items: ['Meditation', 'Yoga', 'Running'] }
    ],
    
    publications: [
      { title: 'Minimally Invasive Techniques in Brain Tumor Surgery', journal: 'New England Journal of Medicine', year: '2023' },
      { title: 'Outcomes in Pediatric Neurosurgery: A 10-Year Study', journal: 'The Lancet Neurology', year: '2022' },
      { title: 'Innovation in Surgical Training: Virtual Reality Applications', journal: 'Nature Medicine', year: '2021' }
    ],
    
    career: [
      {
        id: 1,
        title: 'Head of Neurosurgery & Professor',
        company: 'Royal London Hospital & Imperial College',
        location: 'London, UK',
        startDate: '2018-09',
        endDate: null,
        description: 'Leading neurosurgery department with 25+ surgeons. Pioneered minimally invasive techniques that reduced patient recovery time by 50%.'
      },
      {
        id: 2,
        title: 'Consultant Neurosurgeon',
        company: 'Great Ormond Street Hospital',
        location: 'London, UK',
        startDate: '2013-01',
        endDate: '2018-08',
        description: 'Specialized in pediatric neurosurgery. Performed over 1,000 successful brain surgeries with 98% success rate.'
      },
      {
        id: 3,
        title: 'Neurosurgery Fellow',
        company: 'Johns Hopkins Hospital',
        location: 'Baltimore, MD, USA',
        startDate: '2011-07',
        endDate: '2012-12',
        description: 'Advanced fellowship in complex brain tumor surgery and stereotactic procedures.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'Fellowship in Neurosurgery',
        institution: 'Johns Hopkins University',
        location: 'Baltimore, MD, USA',
        startDate: '2011-07',
        endDate: '2012-12',
        description: 'Advanced training in complex neurosurgical procedures'
      },
      {
        id: 2,
        degree: 'MBBS (Medicine)',
        institution: 'University of Cambridge',
        location: 'Cambridge, UK',
        startDate: '2000-10',
        endDate: '2006-06',
        description: 'First Class Honours, Distinction in Surgery'
      }
    ],
    
    achievements: [
      {
        id: 1,
        title: 'Order of the British Empire (OBE)',
        organization: 'Her Majesty The Queen',
        date: '2022-06',
        description: 'Honored for services to neurosurgery and medical education'
      },
      {
        id: 2,
        title: 'International Neurosurgeon of the Year',
        organization: 'World Federation of Neurosurgical Societies',
        date: '2021-09',
        description: 'Recognized for pioneering minimally invasive surgical techniques'
      },
      {
        id: 3,
        title: 'Royal College of Surgeons Gold Medal',
        organization: 'Royal College of Surgeons',
        date: '2019-03',
        description: 'Highest honor for surgical excellence and innovation'
      }
    ]
  }
]

export const getProfileBySlug = (slug: string): Profile | undefined => {
  return profiles.find(profile => profile.slug === slug)
}

export const getFeaturedProfiles = (limit: number = 9): Profile[] => {
  return profiles.slice(0, limit)
}