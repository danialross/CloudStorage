'use client';
import { FaMixcloud } from 'react-icons/fa';
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

export default function Page() {
  const files = [
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
          <div className={'flex justify-end'}>
            <div className={'flex w-1/4 gap-4'}>
              <Input placeholder={'Search'} />
              <Button>Search</Button>
            </div>
          </div>
          <div className={' max-h-[650px] overflow-auto'}>
            <Table>
              <TableHeader>
                <TableRow className={'h-16'}>
                  <TableHead className={'w-[400px]'}>Name</TableHead>
                  <TableHead className={'w-[200px]'}>Type</TableHead>
                  <TableHead className={'w-[200px]'}>Size</TableHead>
                  <TableHead className={'w-[200px]'}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((data) => (
                  <TableRow key={data.name} className={'h-16'}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.fileType}</TableCell>
                    <TableCell>{data.fileSize}</TableCell>
                    <TableCell>
                      <Button
                        variant={'tertiary'}
                        onClick={() => console.log('clicked')}
                      >
                        Download
                      </Button>
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
