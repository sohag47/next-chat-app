import {IColumn} from "@/types/table";
import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";

export default function PrintTable({
  fetchData,
  columns,
  CUSTOM_BUTTON,
  TITLE,
}: {
  fetchData: any[];
  columns: IColumn[];
  CUSTOM_BUTTON: any;
  TITLE: string;
}) {
  const topContent = (
    <div className="flex justify-between">
      <span className="text-base capitalize font-semibold">{TITLE ?? ""}</span>
      {CUSTOM_BUTTON ?? ""}
    </div>
  );
  return (
    <Card>
      <CardBody>
        <Table
          topContent={topContent}
          topContentPlacement="outside"
          aria-label="Example table with dynamic content"
        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
          </TableHeader>

          <TableBody items={fetchData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
