import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
// import { userRows } from "../../data";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Add from "../../components/add/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="avatar"
          src={params.row.img || "/noavatar.png"}
          alt="avatar"
        />
      );
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    type: "string",
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "string",
    width: 100,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 90,
    type: "boolean",
  },
];


const Users = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: [`allusers`] ,
    queryFn: () =>
      fetch('http://localhost:8800/api/users').then((res) =>
        res.json(),
      ),
  })

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button type="button" onClick={() => setOpen(true)}>
          Add New User
        </button>
      </div>
      {isLoading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )}
      {open && (
        <Add slug="user" columns={columns} setOpen={setOpen} open={open} />
      )}
    </div>
  );
};

export default Users;
