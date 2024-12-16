'use client';
import { FaMixcloud } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { FiPlus } from 'react-icons/fi';
import { PiSignOutBold } from 'react-icons/pi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrDocumentMissing } from 'react-icons/gr';
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
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const SUCCESS_UPLOAD_MESSSAGE = 'Upload Successful';
  const [failedUploadError, setFailedUploadError] = useState(
    'Error Uploading File',
  );

  const [searchBarData, setSearchBarData] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [isShowingResultHeader, setIsShowingResultHeader] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState(filesList);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [didUploadSucceed, setDidUploadSucceed] = useState(false);
  const [didUploadFail, setDidUploadFail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [isLoadingFileList, setIsLoadingFileList] = useState(true);

  const filterSearch = () => {
    setFilteredSearch(
      filesList.filter(
        (item) =>
          item?.name.toLowerCase().includes(searchBarData.toLowerCase()) ||
          item?.type.toLowerCase().includes(searchBarData.toLowerCase()),
      ),
    );
  };

  const handleSearch = () => {
    if (searchBarData === '') {
      resetSearch();
      return;
    }
    setIsShowingResultHeader(true);
    setIsLoadingFileList(true);
    setSearchedQuery(searchBarData);
    filterSearch();
    setIsLoadingFileList(false);
  };

  const formatSize = (size) => {
    if (size > 1000000) {
      //mb
      return `${(size / 1000000).toFixed(2)} MB`;
    } else if (size > 1000) {
      //kb
      return `${(size / 1000).toFixed(2)} KB`;
    }

    //b
    return `${size} B`;
  };

  const resetSearch = () => {
    setFilteredSearch(filesList);
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
    setUploadedFile(null);
  };

  const handleAddFile = async () => {
    if (!uploadedFile) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload`,
        formData,
        {
          withCredentials: true,
        },
      );
      setDidUploadSucceed(true);
      handleClearFileInput();
    } catch (e) {
      if (e.status === 413) {
        setFailedUploadError('File too large, failed to upload');
      } else {
        setFailedUploadError('Error Uploading File');
      }
      setDidUploadFail(true);
    }
    setIsUploading(false);
  };

  const handleActionThenRefresh = async (action) => {
    try {
      await action();
      await handleGetFilesList();
    } catch (e) {
      console.error('action failed');
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${fileId}`,
        {
          withCredentials: true,
        },
      );
    } catch (e) {
      console.error('Unable to delete resource');
    }
  };

  const handleLogout = async (e) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      router.push(`/`);
    } catch (e) {
      console.error('Unable to log out');
    }
  };

  const handleGetFilesList = async () => {
    setIsLoadingFileList(true);
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files`,
        {
          withCredentials: true,
        },
      );
      setFilesList(result.data);
      setFilteredSearch(result.data);
    } catch (e) {
      console.error(e);
    }
    setIsLoadingFileList(false);
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

  useEffect(() => {
    handleGetFilesList();
  }, []);

  return (
    <div className={'min-h-screen flex flex-col bg-tertiary'}>
      <div className={'flex justify-between items-center px-8 lg:px-16 pt-4'}>
        <div
          className={
            'text-white flex justify-center items-center text-2xl font-bold gap-4'
          }
        >
          <FaMixcloud size={100} />
          Cloud Storage
        </div>
        <div className={'translate-y-2'}>
          <button
            className={
              ' text-white hover:text-tertiary hover:bg-white rounded-lg p-2 text-[30px] lg:text-[40px]'
            }
          >
            <PiSignOutBold onClick={handleLogout} />
          </button>
        </div>
      </div>
      <div className={'w-full h-full px-8 lg:px-16 pt-4 pb-8 flex flex-1'}>
        <div
          className={
            'w-full h-full bg-white outline-2 rounded-xl border-4 p-8 space-y-4 flex-1 flex flex-col'
          }
        >
          <div className={'flex  justify-center sm:justify-end relative'}>
            <span
              className={`text-gray-400 absolute left-0 -bottom-12 md:-bottom-4  text-md transition-opacity duration-200 ease-in-out ${isShowingResultHeader ? 'opacity-100' : 'opacity-0'} `}
            >{`Result for '${searchedQuery}'`}</span>
            <div className={'flex flex-col sm:flex-row gap-4 w-full lg:w-fit'}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>
                    <FiPlus />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add File</DialogTitle>
                  </DialogHeader>
                  <div className={'w-full flex flex-col items-center'}>
                    <span>Select A File To Upload</span>
                    <div className="items-center gap-1.5 py-4">
                      <Label htmlFor="file" className={'hidden'}>
                        File
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => setUploadedFile(e.target.files[0])}
                        ref={fileInputRef}
                      />
                    </div>
                    <div className={'relative w-full flex justify-center'}>
                      <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out text-center ${isUploading ? 'opacity-100' : 'opacity-0'}`}
                      >
                        Uploading...
                      </div>
                      <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out text-green-500 flex gap-2 ${didUploadSucceed ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <IoCheckmarkCircleOutline size={30} />
                        <span>{SUCCESS_UPLOAD_MESSSAGE}</span>
                      </div>
                      <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out text-red-500 flex gap-2 ${didUploadFail ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <RxCrossCircled size={30} />
                        <span>{failedUploadError}</span>
                      </div>
                    </div>
                  </div>
                  <div className={'flex justify-between'}>
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                    <Button
                      variant={'outline'}
                      disabled={!uploadedFile}
                      onClick={() => handleActionThenRefresh(handleAddFile)}
                    >
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
                  <FaMagnifyingGlass />
                </Button>
                <Button
                  onClick={resetSearch}
                  variant={'outline'}
                  className={'w-full'}
                >
                  <RxCross2 className={'font-bold'} />
                </Button>
              </div>
            </div>
          </div>
          <div className={'h-[650px] overflow-auto pt-8 lg:pt-0'}>
            {isLoadingFileList ? (
              <div className={'h-full w-full flex justify-center items-center'}>
                <AiOutlineLoading3Quarters
                  className={'animate-spin text-tertiary'}
                  size={200}
                />
              </div>
            ) : filteredSearch.length !== 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className={'h-16'}>
                    <TableHead>Name</TableHead>
                    <TableHead className={'text-left hidden md:table-cell'}>
                      Type
                    </TableHead>
                    <TableHead className={'text-left hidden md:table-cell'}>
                      Size
                    </TableHead>
                    <TableHead className={'text-center'}>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className={'transition-opacity duration-200 ease-in-out'}
                >
                  {filteredSearch.map((data) => (
                    <TableRow key={data._id} className={'h-16'}>
                      <TableCell className={'max-w-[600px]'}>
                        {data.name}
                      </TableCell>
                      <TableCell
                        className={
                          'max-w-[100px] text-left hidden md:table-cell'
                        }
                      >
                        {data.type}
                      </TableCell>
                      <TableCell className={'text-left hidden md:table-cell'}>
                        {formatSize(data.size)}
                      </TableCell>
                      <TableCell className={'text-center'}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}>
                              <BsThreeDots />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem
                              className={'text-destructive'}
                              onClick={() =>
                                handleActionThenRefresh(() =>
                                  handleDeleteFile(data._id),
                                )
                              }
                            >
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
              <div
                className={
                  'h-full w-full flex flex-col justify-center items-center gap-8'
                }
              >
                <GrDocumentMissing className={''} size={100} />
                <span className={'text-lg lg:text-2xl'}>No Files</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
