import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import Co2Icon from '@mui/icons-material/Co2';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const thingsToKnow = [
  {
    title: 'House rules',
    content: [
      { name: 'No smoking', icon: <SmokeFreeIcon className="thingstoknow" /> },
      {
        name: 'No parties or events',
        icon: <CelebrationIcon className="thingstoknow" />,
      },
    ],
  },
  {
    title: 'Health & safety',
    content: [
      {
        name: "Airbnb's COVID-19 safety practices apply",
        icon: <CoronavirusIcon className="thingstoknow" />,
      },
      {
        name: 'Carbon monoxide alarm not reported',
        icon: <Co2Icon className="thingstoknow" />,
      },
      {
        name: 'Smoke alarm not reported',
        icon: <NotificationsActiveIcon className="thingstoknow" />,
      },
    ],
  },
  {
    title: 'Cancellation policy',
    content: [
      {
        name: 'Free cancellation before check-in 2 days.',
        icon: <CancelIcon className="thingstoknow" />,
      },
      {
        name: 'Review the hosts full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.',
        icon: <HelpIcon className="thingstoknow" />,
      },
    ],
  },
];

export const footer = [
  {
    title: 'Support',
    content: [
      'Help Center',
      'AirCover',
      'Safety information',
      'Supporting people with disabilities',
      'Cancellation options',
      'Report a neighborhood concern',
    ],
  },
  {
    title: 'Community',
    content: [
      'Airbnb.org: disaster relief housing',
      'Support Afghan refugees',
      'Combating discrimination',
    ],
  },
  {
    title: 'Hosting',
    content: [
      'Try hosting',
      'AirCover for Hosts',
      'Explore hosting resources',
      'Visit our community forum',
      'How to host responsibly',
    ],
  },
  {
    title: 'Airbnb',
    content: [
      'Newsroom',
      'Learn about new features',
      'Letter from our founders',
      'Careers',
      'Investors',
      'Gift cards',
    ],
  },
];

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};