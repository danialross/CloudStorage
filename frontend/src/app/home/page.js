'use client';
import { FaMixcloud } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';

export default function Page() {
  //store all data in array at load
  const allFilesData = [
    {
      name: 'Document1',
      fileType: '.pdf',
      fileSize: '1.2 MB',
    },
    {
      name: 'Image1',
      fileType: '.jpg',
      fileSize: '2.4 MB',
    },
    {
      name: 'Presentation1',
      fileType: '.pptx',
      fileSize: '5.7 MB',
    },
    {
      name: 'Spreadsheet1',
      fileType: '.xlsx',
      fileSize: '3.1 MB',
    },
    {
      name: 'Script1',
      fileType: '.js',
      fileSize: '450 KB',
    },
    {
      name: 'Report1',
      fileType: '.docx',
      fileSize: '2.0 MB',
    },
    {
      name: 'Audio1',
      fileType: '.mp3',
      fileSize: '8.6 MB',
    },
    {
      name: 'Video1',
      fileType: '.mp4',
      fileSize: '25.3 MB',
    },
    {
      name: 'Archive1',
      fileType: '.zip',
      fileSize: '15.2 MB',
    },
    {
      name: 'Notasdes1',
      fileType: '.txt',
      fileSize: '100 KB',
    },
    {
      name: 'Notasdeas1',
      fileType: '.txt',
      fileSize: '100 KB',
    },
    {
      name: 'Notas1des1',
      fileType: '.txt',
      fileSize: '100 KB',
    },
    {
      name: 'Not2asdes1',
      fileType: '.txt',
      fileSize: '100 KB',
    },
  ];
  const [searchBarData, setSearchBarData] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [isShowingResultHeader, setIsShowingResultHeader] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState(allFilesData);

  const filterSearch = () => {
    setFilteredSearch(
      allFilesData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchBarData.toLowerCase()) ||
          item.fileType.toLowerCase().includes(searchBarData.toLowerCase()),
      ),
    );
  };

  const handleSearch = () => {
    if (searchBarData === '') {
      resetSearch();
      return;
    }
    setIsShowingResultHeader(true);
    setSearchedQuery(searchBarData);
    filterSearch();
  };

  const resetSearch = () => {
    setFilteredSearch(allFilesData);
    setIsShowingResultHeader(false);
    setSearchBarData('');
    setTimeout(() => setSearchedQuery(''), 500);
  };

  const handleEnterDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={'flex flex-col w-screen h-screen bg-tertiary'}>
      <div
        className={
          'text-white flex justify-start items-center text-4xl font-bold gap-4 px-16 pt-4'
        }
      >
        <FaMixcloud size={100} />
        Cloud Storage
      </div>
      <div className={'px-16 pt-4 pb-8 flex flex-col flex-1'}>
        <div
          className={
            'bg-white outline-2 rounded-xl border-4 p-8 space-y-4 flex-1 flex flex-col'
          }
        >
          <div className={'flex justify-end relative'}>
            <span
              className={`absolute left-2 top-1/2 -translate-y-1/2  text-lg transition-all duration-200 ease-in-out ${isShowingResultHeader ? 'opacity-100' : 'opacity-0'} `}
            >{`Result for '${searchedQuery}'`}</span>
            <div className={'flex w-1/4 gap-4'}>
              <Input
                placeholder={'Search'}
                onChange={(e) => setSearchBarData(e.target.value)}
                value={searchBarData}
                onKeyDown={handleEnterDown}
              />
              <Button onClick={handleSearch}>Search</Button>
              <Button onClick={resetSearch} variant={'destructive'}>
                Clear
              </Button>
            </div>
          </div>
          <div className={'max-h-[600px] overflow-auto'}>
            <Table>
              <TableHeader>
                <TableRow className={'h-16'}>
                  <TableHead className={'w-[400px]'}>Name</TableHead>
                  <TableHead className={'w-[200px]'}>Type</TableHead>
                  <TableHead className={'w-[200px]'}>Size</TableHead>
                  <TableHead className={'w-[200px]'}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                className={'transition-opacity duration-200 ease-in-out'}
              >
                {filteredSearch.map((data) => (
                  <TableRow key={data.name} className={'h-16'}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.fileType}</TableCell>
                    <TableCell>{data.fileSize}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant={'outline'}
                            onClick={() => console.log('clicked')}
                          >
                            <BsThreeDots />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem className={'text-destructive'}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
