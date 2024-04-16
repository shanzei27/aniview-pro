import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { getPaginationData } from '../../utils/utils';

let pageSize =  6;

const ContainerBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '18px'
  }));

export default function AppPagination ({ data, setPageData }) {
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    });
    const theme = useTheme;
    if (window.screen.width > 1800) {
      pageSize = 8
    } else {
      pageSize = 6
    }
    

    useEffect(() => {
        setPagination({...pagination, count: data.count });
        const newPageData = getPaginationData(data["data"],pagination.from, pagination.to);
        setPageData(newPageData);
        console.log(newPageData);
        
    }, [pagination.from, pagination.to]);

    const handlePageChange = (event, page) => {
        const from = (page-1)*pageSize;
        const to = (page-1)*pageSize+pageSize;
        
        setPagination({...pagination, from: from, to: to});
    }

  return (
    <>
        <ContainerBox>
            <Pagination 
            count={Math.ceil(pagination.count/pageSize)} 
            onChange={handlePageChange}
            color="secondary"/>
        </ContainerBox>
    </>
  )
}