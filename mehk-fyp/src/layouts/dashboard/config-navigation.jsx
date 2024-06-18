import { ClassNames } from '@emotion/react';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupIcon from '@mui/icons-material/Group';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: <HomeIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <DashboardIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'verification',
    path: '/verification',
    icon: <VerifiedUserIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'registration',
    path: '/register',
    icon: <PersonAddIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'person\'s data',
    path: '/person-profile',
    icon: <PersonIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'feedback',
    path: '/feedback',
    icon: <FeedbackIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'feedback responses',
    path: '/feedback-responses',
    icon: <QuestionAnswerIcon className="nav-icon" />,
    className: 'nav-item',
  },
  {
    title: 'all employee',
    path: '/all-employee',
    icon: <GroupIcon className="nav-icon" />,
    className: 'nav-item',
  }
];

export default navConfig;
