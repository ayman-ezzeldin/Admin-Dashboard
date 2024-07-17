import { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
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
    field: "title",
    headerName: "Title",
    width: 250,
    type: "string",
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
    type: "string",
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    type: "string",
    headerName: "Producer",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "string",
    width: 100,
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch("http://localhost:8800/api/products").then((res) => res.json()),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Products</h1>
        <button type="button" onClick={() => setOpen(true)}>
          Add New Product
        </button>
      </div>
      {isLoading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}{" "}
      {open && (
        <Add slug="product" columns={columns} setOpen={setOpen} open={open} />
      )}
    </div>
  );
};

export default Products;
