"use client";

import "@/styles/components/dashboard/layout/ovioo-table.scss";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/joy";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";

export default function OviooTable({
    headers,
    rows,
}: {
    headers: string[];
    rows: {
        plan: string;
        unitCost: number;
        quantity: number;
    }[];
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                <Table aria-label="simple table" className="ovioo-card with-shadow bg-white">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header} className="uppercase font-semibold">
                                    {header}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.plan}</TableCell>
                                <TableCell>{row.unitCost}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.unitCost * row.quantity}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        className="download-btn"
                                    >
                                        <DownloadIcon />
                                        Download
                                    </Button>
                                </TableCell>
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
                        <ArrowDropDownIcon onChange={() => handleChangeRowsPerPage} />
                    ),
                }}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => (
                    <div className="flex">
                        <IconButton
                            onClick={() => onPageChange(null, page - 1)}
                            disabled={page === 0}
                            aria-label="Previous Page"
                        >
                            <KeyboardArrowLeft className="dark:text-white" />
                        </IconButton>
                        <IconButton
                            onClick={() => onPageChange(null, page + 1)}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="Next Page"
                        >
                            <KeyboardArrowRight className="dark:text-white" />
                        </IconButton>
                    </div>
                )}
            />
        </Paper>
    );
}
