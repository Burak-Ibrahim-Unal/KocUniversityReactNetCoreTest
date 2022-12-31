import { useCallback, useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import {
  Grid,
  PagingPanel,
  Table,
  TableKeyboardNavigation,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  Toolbar,
  ExportPanel,
  TableSelection,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  DataTypeProvider,
  FilteringState,
  IntegratedFiltering,
  EditingState,
} from "@devexpress/dx-react-grid";
import AppPagination from "./AppPagination";
import TableColorRowComponent from "./TableColorRow";
import { SortingState, IntegratedSorting } from "@devexpress/dx-react-grid";
import Tooltip from "@mui/material/Tooltip";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import * as PropTypes from "prop-types";
import saveAs from "file-saver";
import { useAppSelector } from "../store/configureStore";

export interface Props {
  rowItems: any[];
}

//ilgili rowun idsimni tutan kod
const getRowId = (row: any) => row.id;

//Tablo sütunları Start
const columns = [
  //{ name: "id", title: "ID" },
  { name: "courseId", title: "Course Number" },
  { name: "courseName", title: "Course Name" },
];
//Tablo sütunları End

//Custom Filtering Start
const PREFIX = "KocUniversity";
const classes = {
  root: `${PREFIX}-root`,
  numericInput: `${PREFIX}-numericInput`,
};
const StyledInput = styled(Input)(({ theme }: { theme: any }) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(1),
  },
  [`& .${classes.numericInput}`]: {
    fontSize: "14px",
    textAlign: "right",
    width: "100%",
  },
}));

const CurrencyEditor = ({
  value,
  onValueChange,
}: {
  value: any;
  onValueChange: any;
}) => {
  const handleChange = (event: any) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === "") {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <StyledInput
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? "" : value}
      inputProps={{
        min: 2000,
        placeholder: "Filter",
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditor.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

CurrencyEditor.defaultProps = {
  value: undefined,
};
//Custom Filtering End

// Hücreye ek biçim vermek için yazdığım örnek kod Start
// Not: Price alanına $ koymak ve renki kalın mavi yapmak için gereken kod
const CurrencyFormatterTL = ({ value }: any) => (
  <b style={{ color: "darkblue" }}>
    {value.toLocaleString("tr-TR", { style: "currency", currency: "TL" })}
  </b>
);
const CurrencyFormatterUSD = ({ value }: any) => (
  <b style={{ color: "darkblue" }}>
    {value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
  </b>
);
const CurrencyTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={CurrencyFormatterUSD} {...props} />
);
// Hücreye ek biçim vermek için yazdığım örnek kod End

// Tooltip Ayarları Start
const TooltipFormatter = ({
  row: { courseId, courseName },
  value,
}: {
  row: {
    courseId: any;
    courseName: any;
  };
  value: any;
}) => (
  <Tooltip
    title={
      <span>
        {`Course Id: ${courseId}`}
        <br />
        <hr />
        {`Course Name: ${courseName}`}
        <br />
        <hr />
      </span>
    }
  >
    <span>{value}</span>
  </Tooltip>
);
const CellTooltip = (props: any) => (
  <DataTypeProvider
    for={columns.map(({ name }) => name)}
    formatterComponent={TooltipFormatter}
    {...props}
  />
);
// Tooltip Ayarları End

//Excel export start
const onSave = (workbook: any) => {
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};
//Excel export end

export default function CourseGrid({ rowItems }: Props) {
  //Sütun ayarları Start
  const [sorting, setSorting] = useState<any>([
    { columnName: "firstName", direction: "asc" },
  ]);
  const [selection, setSelection] = useState<any>([]);
  const [tableColumnAlignmentExtensions] = useState<any[]>([
    {
      columnName: "courseId",
      align: "left",
      width: "25%",
    },
    { columnName: "courseName", align: "center", width: "75%" },
  ]);
  //Sütun ayarları End

  //Sütun ayarları Start
  const [rows, setRows] = useState<any[]>(rowItems);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const changeAddedRows = (value: any) => {
    setAddedRows(value);
  };

  //New,edit ve delete çalışması için gerekenler
  const commitChanges = ({
    added,
    changed,
    deleted,
  }: {
    added: any;
    changed: any;
    deleted: any;
  }) => {
    let changedRows: any;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row: any, index: any) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  //Sütun ayarları End

  // Sabit ve hareketli kolonlar için bölünmüş kolonlar Start
  // const [leftColumns] = useState(['name', 'channel']);
  // const [rightColumns] = useState<any[]>([
  // {
  //   columnName: "description",
  //   align: "left",
  //   width: "20%",
  //   wordWrapEnabled: false,
  // },
  // { columnName: "pictureUrl", align: "center", width: "20%" },
  // { columnName: "brand", align: "center", width: "10%" },
  // { columnName: "type", align: "center", width: "10%" },
  // { columnName: "price", align: "center", width: "10%" },
  // { columnName: "stockQuantity", align: "right", width: 150 },]);
  // Sabit ve hareketli kolonlar için bölünmüş kolonlar End

  //Hücreler arasında klavye yön tuşlarıyla gezmek için gereken kod
  const [focusedCell, setFocusedCell] = useState<any>(undefined);

  //Excel Ayarları Start
  const exporterRef = useRef<any>(null);
  const startExport = useCallback(
    (options) => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );
  //Excel Ayarları End

  // Parasal değer alrısak $ koymak ve renki kalın mavi yapmak için gereken kod
  const [currencyColumns] = useState(["price"]);

  // Price alanına custom filter ekledik
  const [currencyFilterOperations] = useState([
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
  ]);

  // Price alanına göre sort yapmayı engelleyen fonksiyon
  const [sortingStateColumnExtensions] = useState([
    { columnName: "price", sortingEnabled: false },
  ]);

  // Pagination Hook Ayarları Start
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 20, 50]);
  const [currentPage, setCurrentPage] = useState(0);
  // Pagination Hook Ayarları End

  const { user } = useAppSelector((state) => state.account);

  return (
    <Paper>
      <Grid rows={rowItems} columns={columns} getRowId={getRowId}>
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          // defaultCurrentPage={metaData?.currentPage}
          // pageSize={metaData?.pageSize}
          // onPageSizeChange={setPageSize}
        />
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          columnExtensions={sortingStateColumnExtensions}
        />
        <IntegratedSorting />
        <IntegratedSelection />
        <IntegratedPaging />
        <CurrencyTypeProvider for={currencyColumns} />
        <CellTooltip />
        <DataTypeProvider
          for={currencyColumns}
          editorComponent={CurrencyEditor}
          availableFilterOperations={currencyFilterOperations}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        {user && user.roles?.includes("Admin") && (
          <EditingState
            editingRowIds={editingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={() => commitChanges}
          />
        )}
        <Table
          tableComponent={TableColorRowComponent}
          columnExtensions={tableColumnAlignmentExtensions}
        />
        <TableFilterRow showFilterSelector />
        <TableHeaderRow showSortingControls />
        <TableKeyboardNavigation
          focusedCell={focusedCell}
          onFocusedCellChange={setFocusedCell}
        />
        <PagingPanel pageSizes={pageSizes} />
        <TableSelection showSelectAll />
        {/* {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setcurrentPage({ currentPage: page }))
            }
          />
        )} */}
        <Toolbar />
        <ExportPanel startExport={startExport} />
        {/* <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
        /> */}
        {user && user.roles?.includes("Admin") && (
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        )}
      </Grid>
      <span>Total rows selected: {selection.length}</span>
      <GridExporter
        ref={exporterRef}
        rows={rowItems}
        columns={columns}
        selection={selection}
        onSave={onSave}
      />
    </Paper>
  );
}
