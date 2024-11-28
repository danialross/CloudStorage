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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { RxCrossCircled } from 'react-icons/rx';
import { useEffect, useRef, useState } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';

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
  const SUCCESS_UPLOAD_MESSSAGE = 'Upload Successful';
  const FAILED_UPLOAD_MESSSAGE = 'Error Uploading File';
  const [searchBarData, setSearchBarData] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [isShowingResultHeader, setIsShowingResultHeader] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState(allFilesData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [didUploadSucceed, setDidUploadSucceed] = useState(false);
  const [didUploadFail, setDidUploadFail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleClearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddFile = () => {
    if (!uploadedFile) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      //make axios req to send to backend
      throw new Error();
      setDidUploadSucceed(true);
      handleClearFileInput();
    } catch (e) {
      setDidUploadFail(true);
    }
    setIsUploading(false);
  };

  useEffect(() => {
    if (didUploadFail) {
      const timeoutId = setTimeout(() => {
        setDidUploadFail(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [didUploadFail]);

  useEffect(() => {
    if (didUploadSucceed) {
      const timeoutId = setTimeout(() => {
        setDidUploadSucceed(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [didUploadSucceed]);

  return (
    <div className={'min-h-screen flex flex-col bg-tertiary'}>
      <div
        className={
          'text-white flex justify-center md:justify-start items-center text-3xl md:text-5xl font-bold gap-4 md:pl-16 pt-4 '
        }
      >
        <FaMixcloud size={100} />
        Cloud Storage
      </div>
      <div className={'w-full h-full px-16 pt-4 pb-8 flex flex-1'}>
        <div
          className={
            'w-full h-full bg-white outline-2 rounded-xl border-4 p-8 space-y-4 flex-1 flex flex-col'
          }
        >
          <div className={'flex  justify-center sm:justify-end relative'}>
            <span
              className={`text-gray-400 absolute left-0 -bottom-8 md:-bottom-4  text-md transition-opacity duration-200 ease-in-out ${isShowingResultHeader ? 'opacity-100' : 'opacity-0'} `}
            >{`Result for '${searchedQuery}'`}</span>
            <div className={'flex flex-col sm:flex-row gap-4'}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={handleSearch} variant={'outline'}>
                    Add Files
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add File</DialogTitle>
                  </DialogHeader>
                  <div className={'w-full flex flex-col items-center'}>
                    <span className={'font-bold'}>Select A File To Upload</span>
                    <div className="grid w-2/3 items-center gap-1.5 py-8">
                      <Label htmlFor="file" className={'hidden'}>
                        File
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => setUploadedFile(e.target.files[0])}
                        ref={fileInputRef}
                        className={'text-center'}
                      />
                    </div>
                    <div className={'relative w-full h-8 flex justify-center'}>
                      {isUploading && 'Uploading...'}
                      <IoCheckmarkCircleOutline
                        size={30}
                        className={`absolute top-0 left-1/2 -translate-x-20 transition-opacity duration-200 ease-in-out text-green-500 ${didUploadSucceed ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span
                        className={`absolute top-0 left-1/2 -translate-x-12 transition-opacity duration-200 ease-in-out ${didUploadSucceed ? 'opacity-100' : 'opacity-0'}`}
                      >
                        {SUCCESS_UPLOAD_MESSSAGE}
                      </span>
                      <RxCrossCircled
                        size={30}
                        className={`absolute top-0 left-1/2 -translate-x-24 transition-opacity duration-200 ease-in-out text-red-500 ${didUploadFail ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span
                        className={`absolute top-0 left-1/2 -translate-x-12 transition-opacity duration-200 ease-in-out ${didUploadFail ? 'opacity-100' : 'opacity-0'}`}
                      >
                        {FAILED_UPLOAD_MESSSAGE}
                      </span>
                    </div>
                  </div>
                  <div className={'flex justify-between'}>
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                    <Button variant={'outline'} onClick={handleAddFile}>
                      Add
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Input
                placeholder={'Search'}
                onChange={(e) => setSearchBarData(e.target.value)}
                value={searchBarData}
                className={'min-w-[150px] max-w-[300px]'}
                onKeyDown={handleEnterDown}
              />
              <div className={'flex gap-4'}>
                <Button onClick={handleSearch} className={'w-full'}>
                  Search
                </Button>
                <Button
                  onClick={resetSearch}
                  variant={'destructive'}
                  className={'w-full'}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div className={'h-full max-h-[650px] overflow-auto'}>
            {filteredSearch.length !== 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className={'h-16'}>
                    <TableHead>Name</TableHead>
                    <TableHead className={' hidden md:table-cell'}>
                      Type
                    </TableHead>
                    <TableHead className={' hidden md:table-cell'}>
                      Size
                    </TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className={'transition-opacity duration-200 ease-in-out'}
                >
                  {filteredSearch.map((data, index) => (
                    <TableRow key={index} className={'h-16'}>
                      <TableCell>{data.name}</TableCell>
                      <TableCell className={' hidden md:table-cell'}>
                        {data.fileType}
                      </TableCell>
                      <TableCell className={' hidden md:table-cell'}>
                        {data.fileSize}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
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
            ) : (
              <div className={'w-full text-gray-400 py-8'}>No Results</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
