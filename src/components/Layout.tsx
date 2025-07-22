
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, BarChart3, Inbox, AlertTriangle, Kanban, Globe, Users, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home
  },
  {
    name: 'Inbox',
    href: '/inbox',
    icon: Inbox
  },
  {
    name: 'Issues',
    href: '/issues',
    icon: AlertTriangle
  },
  {
    name: 'People',
    href: '/people',
    icon: Users
  },
  {
    name: 'Polls',
    href: '/polls',
    icon: BarChart3
  },
  {
    name: 'Priorities',
    href: '/priorities',
    icon: Kanban
  },
  {
    name: 'Website',
    href: '/website',
    icon: Globe
  }
];

const bottomNavigation = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile menu */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h2 className="text-lg font-semibold text-foreground">Serve</h2>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-md text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex-1 p-4">
              <ul className="space-y-2">
                {navigation.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Bottom navigation for mobile */}
            <div className="border-t p-4 pb-8 flex-shrink-0">
              <ul className="space-y-2">
                {bottomNavigation.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        onClick={() => setMobileMenuOpen(false)} 
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-bold text-primary">Serve</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map(item => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link 
                          to={item.href} 
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              
              {/* Bottom navigation for desktop */}
              <li className="mt-auto">
                <div className="border-t pt-4 pb-6 -mx-2">
                  <ul className="space-y-1">
                    {bottomNavigation.map(item => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link 
                            to={item.href} 
                            className={cn(
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                              isActive 
                                ? "bg-primary text-primary-foreground" 
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b lg:hidden">
          <div className="flex h-16 items-center gap-x-4 px-4">
            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-primary">Serve</h1>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6 lg:py-8 bg-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* User info footer - shows current user context */}
      <div className="lg:pl-64">
        <div className="border-t px-4 py-3 text-xs text-muted-foreground bg-slate-100 text-center">
          GoodParty.org
        </div>
      </div>
    </div>
  );
}
