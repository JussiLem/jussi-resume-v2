import {
  AcademicCapIcon,
  CalendarIcon,
  DownloadIcon,
  FlagIcon,
  MapIcon,
  OfficeBuildingIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineExperienceItem,
  TimelineItem,
} from './dataDef';
import GithubIcon from '../components/Icon/GithubIcon';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Jussi Resume',
  description: "Example site built with Tim Baker's react resume template",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  name: `I'm Jussi Lemmetyinen`,
  description: (
    <>
      <p className="prose-sm text-slate-700 dark:text-white sm:prose-base lg:prose-lg">
        I'm a Helsinki based <strong className="text-slate-900 dark:text-white">Solution Architect</strong>, currently
        working at <strong className="text-slate-900 dark:text-white">Gofore Oyj</strong> helping microservice and
        event-driven architectures with hands-on attitude.
      </p>
      <p className="prose-sm text-slate-700 dark:text-white sm:prose-base lg:prose-lg">
        In my free time time, you can catch me listening and playing music, drinking craft beer and exploring{' '}
        <strong className="text-slate-700 dark:text-white">new cultures</strong>, or just{' '}
        <strong className="text-slate-700 dark:text-white">Finland</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: DownloadIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  description: `Use this bio section as your way of describing yourself and saying what you do, what technologies you like
  to use or feel most comfortable with, describing your personality, or whatever else you feel like throwing
  in.`,
  aboutItems: [
    { label: 'Location', text: 'Helsinki, Finland', Icon: MapIcon },
    { label: 'Age', text: '36', Icon: CalendarIcon },
    { label: 'Nationality', text: 'Finnish', Icon: FlagIcon },
    { label: 'Interests', text: 'Music, Craft beers, Wines', Icon: SparklesIcon },
    { label: 'Study', text: 'Haaga-Helia University of Applied Sciences', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Gofore Oyj', Icon: OfficeBuildingIcon },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'Finnish',
        level: 10,
      },
      {
        name: 'English',
        level: 9,
      },
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Typescript',
        level: 7,
      },
      {
        name: 'GraphQL',
        level: 6,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 8,
      },
      {
        name: 'Rust',
        level: 5,
      },
      {
        name: 'Golang',
        level: 4,
      },
    ],
  },
  {
    name: 'Mobile development',
    skills: [
      {
        name: 'React Native',
        level: 9,
      },
      {
        name: 'Flutter',
        level: 4,
      },
      {
        name: 'Swift',
        level: 3,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Project title 1',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 2',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 3',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 4',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 5',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 6',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 7',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 8',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 9',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 10',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
  {
    title: 'Project title 11',
    description: 'Give a short description of your project here.',
    url: 'https://jussilemmetyinen.me',
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'April 2007',
    location: 'Clown college',
    title: 'Masters in Beer tasting',
    content: 'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
  },
  {
    date: 'March 2003',
    location: 'School of Business',
    title: 'What did you study 101',
    content: 'Describe your experience at school, what you learned, what useful skills you have acquired etc.',
  },
];

export const certifications: TimelineItem[] = [
  {
    date: '2021-09',
    title: 'AWS Certified Security - Speciality',
  },
  {
    date: '2021-08',
    title: 'AWS Certified Developer - Associate',
  },
  {
    date: '2021-06',
    title: 'AWS Certified SysOps Adminstrator - Associate',
  },
  {
    date: '2020-08',
    title: 'AWS Certified Solutions Architect - Associate',
  },
  {
    date: '2019-08',
    title: 'Professional Scrum Master(PSM 1)',
  },
];

export const experience: TimelineExperienceItem[] = [
  {
    date: '2023-04',
    location: 'Gofore Oyj',
    title: 'Solutions Architect',
    content:
      'Describe work, special projects, notable achievements, what technologies you have been working with, and' +
      'anything else that would be useful for an employer to know.',
  },
  {
    date: '2022-02',
    endDate: '2023-03',
    location: 'Fintraffic Oy',
    title: 'Solutions Architect',
    content:
      'Describe work, special projects, notable achievements, what technologies you have been working with, and' +
      'anything else that would be useful for an employer to know.',
  },
  {
    date: '2021-07',
    endDate: '2022-01',
    location: 'Siili Solutions Oyj',
    title: 'Consultant',
    content:
      'Describe work, special projects, notable achievements, what technologies you have been working with, and' +
      'anything else that would be useful for an employer to know.',
  },
  {
    date: '2019-08',
    endDate: '2021-07',
    location: 'Siili Solutions Oyj',
    title: 'Junior Consultant',
    content:
      'Describe work, special projects, notable achievements, what technologies you have been working with, and' +
      'anything else that would be useful for an employer to know.',
  },
  {
    date: '2018-05',
    endDate: '2019-07',
    location: 'Svea Ekonomi Oy',
    title: 'Software Developer',
    content:
      'Describe work, special projects, notable achievements, what technologies you have been working with, and' +
      'anything else that would be useful for an employer to know.',
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: 'testimonialImage',
  testimonials: [
    {
      name: 'John Doe',
      text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Jane Doe',
      text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'jussi.lem@gmail.com',
      href: 'mailto:jussi.lem@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Helsinki, Finland',
    },
    {
      type: ContactType.Github,
      text: 'JussiLem',
      href: 'https://github.com/JussiLem',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [{ label: 'Github', Icon: GithubIcon, href: 'https://github.com/JussiLem' }];
