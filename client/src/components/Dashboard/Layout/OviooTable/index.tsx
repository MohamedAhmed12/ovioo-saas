"use client";

import "@/styles/components/dashboard/layout/ovioo-table.scss";
import { IconButton } from "@mui/joy";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { ReactNode, useState } from "react";
import {
    MdArrowDropDown,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";

export default function OviooTable({
    headers,
    rows,
    actions,
}: {
    headers: string[];
    rows: any[];
    actions?: ReactNode;
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className="ovioo-table flex flex-col">
            <TableContainer component={Paper}>
                <Table
                    aria-label="simple table"
                    className="ovioo-card with-shadow bg-white"
                >
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell
                                    key={header}
                                    className="uppercase font-semibold"
                                >
                                    {header}
                                </TableCell>
                            ))}

                            {actions && <TableCell />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : rows
                        ).map((row, rowIndex) => (
                            <TableRow key={rowIndex + "-row"}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <TableCell
                                        key={`${cellIndex}-${headers[cellIndex]}-cell`}
                                    >
                                        {String(cell)}
                                    </TableCell>
                                ))}

                                {actions && actions}
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                className="ovioo-card with-shadow bg-white"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                SelectProps={{
                    IconComponent: () => (
                        <MdArrowDropDown
                            onChange={() => handleChangeRowsPerPage}
                            style={{
                                width: "100%",
                                height: 25,
                                cursor: "pointer",
                            }}
                        />
                    ),
                }}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={({
                    count,
                    page,
                    rowsPerPage,
                    onPageChange,
                }) => (
                    <div className="flex">
                        <IconButton
                            onClick={() => onPageChange(null, page - 1)}
                            disabled={page === 0}
                            aria-label="Previous Page"
                        >
                            <MdKeyboardArrowLeft
                                className="dark:text-white"
                                size="24"
                            />
                        </IconButton>
                        <IconButton
                            onClick={() => onPageChange(null, page + 1)}
                            disabled={
                                page >= Math.ceil(count / rowsPerPage) - 1
                            }
                            aria-label="Next Page"
                        >
                            <MdKeyboardArrowRight
                                className="dark:text-white"
                                size="24"
                            />
                        </IconButton>
                    </div>
                )}
            />
        </Paper>
    );
}
