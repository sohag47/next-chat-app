/* eslint-disable no-undef */
"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, {useMemo} from "react";

import ReusableSkeleton from "./skeleton";

import {ChevronDownIcon} from "@/assets/icons/chevron-down-icon";
import {SearchIcon} from "@/assets/icons/search-icon";
import {ETable} from "@/enums/tableMode";
import {IColumn, TSearchable} from "@/types/table";
import {capitalize} from "@/utils/capitalize";

export default function RTable({
  INITIAL_VISIBLE_COLUMNS,
  columns,
  fetchData,
  statusOptions,
  sortableColumn,
  useRenderCell,
  CUSTOM_BUTTON,
  SELECTION_MODE,
  TITLE,
  PAGINATION,
  PAGE_ID,
  HANDLE_SELECTED,
  DATA_LOADING,
}: any) {
  const renderCell = useRenderCell();
  const [isLoading, setIsLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(""));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: sortableColumn ?? "id",
    direction: "ascending",
  });
  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
    const selectedData =
      keys === "all"
        ? fetchData
        : fetchData.filter((item: any, index: number) => keys.has(index.toString()));

    HANDLE_SELECTED(selectedData);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const [page, setPage] = React.useState(1);

  const pages =
    fetchData.length > 0 ? Math.ceil(fetchData.length / rowsPerPage) : Math.ceil(1 / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: IColumn) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...fetchData];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        Object.values<TSearchable>(data).some((value: TSearchable) =>
          value?.toString().toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((data) => Array.from(statusFilter).includes(data.status));
    }

    return filteredData;
  }, [fetchData, filterValue, statusFilter, hasSearchFilter, statusOptions]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 overflow-auto">
        <div className="flex flex-wrap justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%] text-dark dark:text-light",
              inputWrapper: "border-1",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon className="text-dark dark:text-light" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex flex-wrap gap-3">
            {statusOptions && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="sm"
                    variant="bordered"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.length > 0 &&
                    statusOptions.map((status: any) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            )}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column: any) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {CUSTOM_BUTTON ? CUSTOM_BUTTON : ""}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="grid grid-cols-1">
            <span className="text-dark dark:text-light text-tiny">
              Total{" "}
              <span className="font-semibold">
                {PAGINATION ? PAGINATION.total : fetchData.length}
              </span>{" "}
              items
            </span>
            {SELECTION_MODE !== ETable.none ? (
              <span className="text-tiny text-dark dark:text-light">
                {selectedKeys === "all"
                  ? "All items selected"
                  : `${selectedKeys.size} of ${items.length} selected`}
              </span>
            ) : (
              ""
            )}
          </div>

          <span className="text-primary dark:text-foreground text-small font-semibold capitalize">
            {TITLE ?? ""}
          </span>
          <label className="flex items-center text-dark dark:text-light text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-dark dark:text-light text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    statusOptions,
    columns,
    TITLE,
    PAGINATION,
    CUSTOM_BUTTON,
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    fetchData.length,
    selectedKeys,
    items.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-primary dark:bg-foreground/70 text-light",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={PAGINATION ? PAGINATION.current_page : page}
          total={PAGINATION ? PAGINATION.last_page : pages}
          variant="light"
          onChange={
            PAGINATION
              ? (newPage) => {
                  PAGE_ID(newPage);
                  setPage(PAGINATION.current_page);
                }
              : setPage
          }
        />
      </div>
    );
  }, [PAGE_ID, page, pages, PAGINATION, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-dark dark:text-light", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  const RenderTable = useMemo(() => {
    console.log("DATA_LOADING :>> ", DATA_LOADING);
    return <></>;
  }, [DATA_LOADING]);

  return (
    <section className="z-30">
      <Table
        isCompact
        removeWrapper
        showSelectionCheckboxes
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode={SELECTION_MODE ?? ETable.none}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={handleSelectionChange}
        onSortChange={setSortDescriptor}
        color={"default"}
      >
        <TableHeader columns={headerColumns}>
          {(column: IColumn) => (
            <TableColumn
              key={column.uid}
              align={
                column?.align === "center" ? "center" : column?.align === "end" ? "end" : "start"
              }
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={(DATA_LOADING || isLoading) && <Spinner />}
          loadingState="loadingMore"
          // emptyContent={
          //   (DATA_LOADING && <ReusableSkeleton numberOfSkeletons={5} />) || isLoading ? (
          //     <ReusableSkeleton numberOfSkeletons={5} />
          //   ) : (
          //     "No Data Found"
          //   )
          // }
          emptyContent={items?.length === 0 ? "No Data Found!" : ""}
          items={sortedItems ?? []}
        >
          {items.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                {(columnKey) => {
                  return (
                    <TableCell className="text-dark dark:text-light font-medium overflow-auto">
                      {renderCell(item, columnKey, index)}
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

// example:
{
  /* <RTable
TITLE={"Author List"}
columns={columns ?? []}
useRenderCell={useRenderCell}
fetchData={listState ?? []}
sortableColumn={true}
INITIAL_VISIBLE_COLUMNS={["sl", "full_name", "title", "dob", "dod", "actions"]}
CUSTOM_BUTTON={add_new_button}
SELECTION_MODE={ETable.none}
PAGINATION={pagination}
PAGE_ID={handleFetchData}
/> */
}
