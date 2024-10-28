import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import logo from "../assets/chat-bot2.png"
import ArticleIcon from '@mui/icons-material/Article';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QuizIcon from '@mui/icons-material/Quiz';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';
import Prueba from './Prueba';
import ChatBotPage from '../pages/ChatBotPage';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Biblioteca',
  },
  {
    segment: 'recientes',
    title: 'Noticias y Actualizaciones',
    icon: <NewspaperIcon />,
  },
  {
    segment: 'normativas',
    title: 'Normativas',
    icon: <AutoStoriesIcon />,
    children: [
      {
        segment: 'constitucion',
        title: 'Constitución de la República',
        icon: <ArticleIcon />,
      },
      {
        segment: 'leyes',
        title: 'Leyes',
        icon: <ArticleIcon />,
      },
      {
        segment: 'decretosley',
        title: 'Decretos-Ley',
        icon: <ArticleIcon />,
      },
      {
        segment: 'decretos',
        title: 'Decretos',
        icon: <ArticleIcon />,
      },
      {
        segment: 'resoluciones',
        title: 'Resoluciones',
        icon: <ArticleIcon />,
      },
      {
        segment: 'instrucciones',
        title: 'Instrucciones',
        icon: <ArticleIcon />,
      },
      {
        segment: 'circulares',
        title: 'Circulares',
        icon: <ArticleIcon />,
      },
    ],
  },
  {
    segment: 'glosariolegal',
    title: 'Glosario Legal',
    icon: <AutoAwesomeMosaicIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Comunidad',
  },
  {
    segment: 'preguntasfrecuentes',
    title: 'Preguntas Frecuentes',
    icon: <QuizIcon />,
  },
  {
    segment: 'foro',
    title: 'Foro de Discusión',
    icon: <GroupsIcon />,
  },
  {
    segment: 'casosestudio',
    title: 'Casos de Estudio',
    icon: <MenuBookIcon />,
  },
  {
    segment: 'eventos',
    title: 'Eventos y Talleres',
    icon: <EventIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Chat-Bot AI',
  },
  {
    segment: 'chat',
    title: 'Chat',
    icon: <ChatIcon />,
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    segment: 'prueba',
    title: 'Prueba',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: '#F9F9FE',
                    paper: '#EEEEF9',
                },
            },
        },
        dark: {
            palette: {
                background: {
                    default: '#343a40',
                    paper: '#212529',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    switch (pathname) {
      case '/prueba':
          return <Prueba pathname={pathname} />;
      case '/chat': 
          return <ChatBotPage pathname={pathname} demoTheme={demoTheme}/>
      default:
          return <Box
              sx={{
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
              }}
          >
              <Typography>Dashboard content for {pathname}</Typography>

          </Box>;
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
      
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logo} alt="Logo IA" style={{ marginLeft: '50px', marginRight: '10px' }} />,
        title: 'Asesor Legal AI',
        
    }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname}/>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
