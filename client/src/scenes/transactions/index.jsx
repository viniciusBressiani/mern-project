import React, {useState} from 'react'
import { useGetTransactionsQuery } from 'state/api'
import { Box, useTheme } from "@mui/material";
import Header from "component/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "component/DataGridCustomToolbar";

const Transactions = () => {
    const theme= useTheme();

    // values to send to backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");


    const [searchInput, setSearchInput] = useState("");
    const {data, isLoading} = useGetTransactionsQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

  
    const columns = [
      {
        field : "_id",
        headerName: "ID",
        flex: 1
      },
      {
        field: "userId",
        headerName: "User id",
        flex: 1
      },
      {
        field: "createdAt",
        headerName: "Create At",
        flex: 1
      },
      {
        field: "products",
        headerName: "N of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => {
          return params.value.length;
        }
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 0.4,
        renderCell: (params) => {
            return "$" + Number(params.value).toFixed(2);
          }
      }
    ]
  
    
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="List of Transactions" />
        <Box
          mt="40px"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root" : {
              border: "none",
  
            },
            "& .MuiDataGrid-cell" : {
              borderBottom: "none"
            },
            "& .MuiDataGird-columnHeaders" : {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light
            },
            "& .MuiDataGrid-footerContainer" : {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
              color: `${theme.palette.secondary[200]} !important`,
            }
          
  
          }}
        >
          <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100] }
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode= "server"
          sortingMode='server'
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar : DataGridCustomToolbar}}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch}
          }}
          />
        </Box>
  
      </Box>
    )
  }
  
  export default Transactions


