import { 
  LayoutDashboard, 
  PieChart, 
  BarChart4, 
  Wallet, 
  Target, 
  CreditCard, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  List
} from 'lucide-react';

export const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
  { name: 'Transactions', icon: <Wallet className="w-5 h-5" />, path: '/transactions' },
  { name: 'Budget', icon: <Target className="w-5 h-5" />, path: '/budget' },
  { name: 'Analytics', icon: <PieChart className="w-5 h-5" />, path: '/analytics' },
  { name: 'Reports', icon: <BarChart4 className="w-5 h-5" />, path: '/reports' },
  { name: 'Categories', icon: <List className="w-5 h-5" />, path: '/categories' },
  { name: 'Accounts', icon: <CreditCard className="w-5 h-5" />, path: '/accounts' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
];