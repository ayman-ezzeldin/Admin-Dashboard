import "./dataTable.scss";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Props = {
  columns: GridColDef[] 
  rows : object[]
  slug : string
}

const DataTable = (props : Props) => {

  const queryClient = useQueryClient()

  const mutation = useMutation(
    {
      mutationFn: (id:number) => {
        return fetch("http://localhost:8800/api/" + props.slug + "/" + id, {
          method: "DELETE",
        }).then((res) => res.json())
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries({ queryKey: [`all${props.slug}`]});
      }
    }
  )

  const handelDelete = (id:number) => {
    mutation.mutate(id)
    console.log(id + " deleted")
  }

  const actionColumn : GridColDef = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="actions">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="view" />
          </Link>
          <div>
            <img src="/delete.svg" alt="delete" onClick={() => handelDelete(params.row.id)} />
          </div>
        </div>
      );
    },
  };


  return (
    <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns , actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
    </div>
  );
};

export default DataTable;
