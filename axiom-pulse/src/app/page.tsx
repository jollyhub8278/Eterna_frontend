'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '@/components/layout/header';
import { PulseTable } from '@/components/pulse/pulse-table';
import { FiltersPanel } from '@/components/pulse/filters-panel';
import { TokenDetailsModal } from '@/components/pulse/token-details-modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { RootState } from '@/lib/redux/store';
import { useFilters } from '@/hooks/use-filters';

export default function HomePage() {
  const isFiltersPanelOpen = useSelector((state: RootState) => state.ui.isFiltersPanelOpen);
  const { filters, updateCategory } = useFilters();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {isFiltersPanelOpen && (
            <aside className="lg:w-64 shrink-0">
              <FiltersPanel />
            </aside>
          )}
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Tabs 
              value={filters.category} 
              onValueChange={(value) => updateCategory(value as typeof filters.category)}
              className="w-full"
            >
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="all">All Pairs</TabsTrigger>
                <TabsTrigger value="new">New Pairs</TabsTrigger>
                <TabsTrigger value="final">Final Stretch</TabsTrigger>
                <TabsTrigger value="migrated">Migrated</TabsTrigger>
              </TabsList>
              
              <TabsContent value={filters.category} className="mt-0">
                <PulseTable />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <TokenDetailsModal />
    </div>
  );
}