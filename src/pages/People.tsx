import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Users, Mail, MessageSquare, ArrowUpDown } from 'lucide-react';
import { getConstituents, getConstituentStats, searchConstituents } from '@/services/constituentsService';
import type { ConstituentRecord } from '@/types/core';
import { ISSUE_COLORS } from '@/utils/issueColors';

const RECORDS_PER_PAGE = 20;

export default function People() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ConstituentRecord>('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const stats = getConstituentStats();
  
  const filteredConstituents = useMemo(() => {
    const results = searchTerm ? searchConstituents(searchTerm) : getConstituents();
    
    return results.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [searchTerm, sortField, sortDirection]);
  
  const totalPages = Math.ceil(filteredConstituents.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const currentConstituents = filteredConstituents.slice(startIndex, endIndex);
  
  const handleSort = (field: keyof ConstituentRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  
  const renderPriorityIssues = (issues: string[]) => {
    const displayIssues = issues.slice(0, 3);
    return (
      <div className="flex flex-wrap gap-1">
        {displayIssues.map((issue, index) => {
          const colors = ISSUE_COLORS[issue] || { bg: 'bg-gray-100', text: 'text-gray-800' };
          return (
            <Badge 
              key={index} 
              className={`text-xs whitespace-nowrap ${colors.bg} ${colors.text} border-0`}
            >
              {issue}
            </Badge>
          );
        })}
        {issues.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{issues.length - 3}
          </Badge>
        )}
      </div>
    );
  };
  
  const renderOptInStatus = (optIn: boolean) => (
    <Badge 
      variant={optIn ? "default" : "secondary"} 
      className={`text-xs ${optIn ? 'bg-green-600 hover:bg-green-600/80' : ''}`}
    >
      {optIn ? "Yes" : "No"}
    </Badge>
  );

  const renderBusinessOwner = (isBusinessOwner: boolean) => (
    <Badge 
      variant={isBusinessOwner ? "default" : "secondary"} 
      className={`text-xs ${isBusinessOwner ? 'bg-green-600 hover:bg-green-600/80' : ''}`}
    >
      {isBusinessOwner ? "Yes" : "No"}
    </Badge>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">People</h1>
        <p className="text-muted-foreground">
          Manage and view your constituent database
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Constituents</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.totalConstituents}</p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Opt-In Email Count</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.optInEmailCount}</p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Opt-In SMS Count</h3>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.optInSMSCount}</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            Create Segment
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Voter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap min-w-[200px]">
                Name
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[100px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('age')}
                >
                  Age
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[220px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('familyStatus')}
                >
                  Family Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('ward')}
                >
                  Ward/District
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[250px]">Priority Issues</TableHead>
              <TableHead className="whitespace-nowrap min-w-[150px]">Political Affiliation</TableHead>
              <TableHead className="whitespace-nowrap min-w-[150px]">Phone Number</TableHead>
              <TableHead className="whitespace-nowrap min-w-[250px]">Email</TableHead>
              <TableHead className="whitespace-nowrap min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('isBusinessOwner')}
                >
                  Business Owner
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('optInSMS')}
                >
                  Opt-In Phone
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="whitespace-nowrap min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium"
                  onClick={() => handleSort('optInEmail')}
                >
                  Opt-In Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentConstituents.map((constituent, index) => (
              <TableRow
                key={constituent.id}
                className={`hover:bg-transparent ${
                  index % 2 === 1 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <TableCell className="font-medium">
                  {constituent.firstName} {constituent.lastName}
                </TableCell>
                <TableCell>
                  {constituent.age}
                </TableCell>
                <TableCell>
                  {constituent.familyStatus}
                </TableCell>
                <TableCell>
                  {constituent.ward}
                </TableCell>
                <TableCell className="min-w-[250px]">
                  {constituent.priorityIssues.length > 0 ? (
                    renderPriorityIssues(constituent.priorityIssues)
                  ) : (
                    <span className="text-muted-foreground text-sm">None</span>
                  )}
                </TableCell>
                <TableCell>
                  {constituent.politicalAffiliation}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {constituent.phone}
                </TableCell>
                <TableCell>
                  {constituent.email}
                </TableCell>
                <TableCell>
                  {renderBusinessOwner(constituent.isBusinessOwner)}
                </TableCell>
                <TableCell>
                  {renderOptInStatus(constituent.optInSMS)}
                </TableCell>
                <TableCell>
                  {renderOptInStatus(constituent.optInEmail)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredConstituents.length)} of{' '}
            {filteredConstituents.length} constituents
          </p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
