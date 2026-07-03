import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PromptsPage } from './pages/PromptsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CareersPage } from './pages/CareersPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { MarketDataPage } from './pages/MarketDataPage';
import { AccountsPage } from './pages/AccountsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: 'prompts',
        Component: PromptsPage,
      },
      {
        path: 'categories',
        Component: CategoriesPage,
      },
      {
        path: 'careers',
        Component: CareersPage,
      },
      {
        path: 'questions',
        Component: QuestionsPage,
      },
      {
        path: 'market-data',
        Component: MarketDataPage,
      },
      {
        path: 'accounts',
        Component: AccountsPage,
      },
      {
        path: 'analytics',
        Component: AnalyticsPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
    ],
  },
]);
