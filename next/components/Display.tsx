import { Box, Button } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Mortgage } from "../lib/db";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  GridValueFormatterParams,
  MuiEvent,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import getSpreadsheet from "../lib/getSpreadsheet";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export const tableWidth = 843.5;

const currencyFormat = (params: GridValueFormatterParams<number>) => {
  return params.value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const percentageFormat = ({ value }: GridValueFormatterParams<number>) =>
  value + "%";

export default function Display() {
  const mortgages = useLiveQuery(() =>
    db.mortgages.toArray()
  ) as GridRowsProp<Mortgage>;
  const [rows, setRows] = useState<GridRowsProp<Mortgage>>([]);
  useEffect(() => {
    if (!!mortgages && !!mortgages.length) {
      setRows(mortgages);
    }
  }, [mortgages]);
  const cols: GridColumns = [
    { field: "lender", headerName: "Lender", type: "string", editable: true },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      valueFormatter: percentageFormat,
      type: "number",
      editable: true,
    },
    {
      field: "monthlyPandI",
      headerName: "Monthly Payment",
      valueFormatter: currencyFormat,
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "discountPointPayment",
      headerName: "Discount Point Cost",
      valueFormatter: currencyFormat,
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "otherUpfrontCosts",
      headerName: "Upfront Costs",
      valueFormatter: currencyFormat,
      type: "number",
      editable: true,
    },
    {
      field: "upfrontCredits",
      headerName: "Upfront Credits",
      valueFormatter: currencyFormat,
      width: 120,
      type: "number",
      editable: true,
    },
    {
      field: "Actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const deletedRow = rows.find((row) => row.id === id);
    setRows(rows.filter((row) => row.id !== id));
    const deleteMortgage = await db.mortgages.where("id").equals(id).delete();
    console.log(`Deleted ${deleteMortgage} item(s).`);
  };

  const handleCancelClick = (id: GridRowId) => async () => {
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
      const deleteMortgage = await db.mortgages.where("id").equals(id).delete();
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  function EditToolbar(props: EditToolbarProps) {
    const { setRowModesModel } = props;

    const handleClick = async () => {
      const newRow = {
        lender: "",
        interestRate: 0,
        monthlyPandI: 0,
        discountPointPayment: 0,
        otherUpfrontCosts: 0,
        upfrontCredits: 0,
        isNew: true,
      };
      const id = await db.mortgages.add(newRow);

      setRows((oldRows) => {
        return [...oldRows, { ...newRow, id }];
      });

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id as GridRowId]: { mode: GridRowModes.Edit, fieldToFocus: "lender" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Mortgage
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box my={3} width="100%" maxWidth={tableWidth}>
      <div
        style={{
          height: 98.5 + 52 * Math.max(rows.length, 1),
          width: "100%",
        }}
      >
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <div style={{ flexGrow: 1, width: "100%" }}>
            <DataGrid
              sx={{ bgcolor: "background.paper" }}
              rows={rows}
              columns={cols}
              autoHeight
              hideFooter
              experimentalFeatures={{ newEditingApi: true }}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              components={{
                Toolbar: EditToolbar,
              }}
              componentsProps={{
                toolbar: { setRowModesModel },
              }}
              onProcessRowUpdateError={(error) => {
                console.error(error);
              }}
              processRowUpdate={async (newRow: Mortgage) => {
                //Number inputs returning null (when the user clicks save with no value)
                //were crashing the DataGrid. These null checkers should prevent that.

                //This function checks if a property is falsy and not zero.
                //If so, it sets the property's value to zero.

                const nullNumChecker = (
                  obj: Mortgage,
                  prop: keyof Mortgage
                ) => {
                  if (!obj[prop] && obj[prop] !== 0) {
                    return { ...obj, [prop]: 0 };
                  }
                  return obj;
                };

                //This function applies the nullchecker above to multiple properties.
                const rowNullNumChecker = (
                  props: (keyof Mortgage)[],
                  obj: Mortgage
                ) => {
                  return props.reduce(nullNumChecker, obj);
                };

                //I'm not null-checking the lender (string) or id (noneditable number) properties.
                const newRowKeys = Object.keys(newRow).filter(
                  (key) => key !== "lender" && key !== "id"
                ) as (keyof Mortgage)[];

                const updatedNewRow = rowNullNumChecker(newRowKeys, newRow);

                const finalRow = { ...updatedNewRow, isNew: false };

                if (newRow.id) {
                  await db.mortgages
                    .where("id")
                    .equals(newRow.id)
                    .modify(finalRow);
                  return finalRow;
                } else {
                  throw new Error("A new row had no id.");
                }
              }}
            />
          </div>
        </div>
      </div>
      <Button type="submit" variant="outlined" color="success" sx={{mt: 2}} onClick={() => {
        getSpreadsheet(rows)
      }}>
        Spreadsheet
      </Button>
    </Box>
  );
}
